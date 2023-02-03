const express = require("express");
const ZarinpalCheckout = require("zarinpal-checkout");
const expressAsyncHandler = require("express-async-handler");
const zarinpal = ZarinpalCheckout.create(process.env.MERCHANT_ID);

const router = express.Router();
router.post(
  "/request",
  expressAsyncHandler((req, res) => {
    try {
      if (!req.body.amount || !req.body.url) {
        return res
          .status(400)
          .send({ message: " مبلغ یا آدرس برگشت ارسال نشده است " });
      }
      /**
       * PaymentRequest [module]
       * @return {String} URL [Payement Authority]
       */
      zarinpal
        .PaymentRequest({
          Amount: req.body.amount, // In Tomans
          CallbackURL: req.body.url,
          Description: "A Payment from Node.JS",
          Email: "fatemeh.afshani78@gmail.com",
          Mobile: req.body.phone || "09123456789",
        })
        .then((response) => {
          if (response.status === 100) {
            console.log("authority", response.url);
            return res.send({ authority: response.url });
          }
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).send({ message: err.message });
        });
    } catch (err) {
      console.log("error", err);
      return res.status(500).send({ message: err.message });
    }
  })
);

router.get(
  "/verification/:amount/:authority",
  expressAsyncHandler((req, res) => {
    //payment verification
    if (!req.params.amount || !req.params.authority) {
      return res
        .status(400)
        .send({ message: "کد یا مبلغ خرید ارسال نشده است" });
    }
    zarinpal
      .PaymentVerification({
        Amount: req.params.amount, // In Tomans
        Authority: req.params.authority,
      })
      .then((response) => {
        if (response.status !== 100) {
          console.log("Empty!");
          return res.status(406).send({ message: "پرداخت موفقیت آمیز نبود" });
        } else {
          console.log(`Verified! Ref ID: ${response.RefID}`);
          return res.status(200).send({ paymentId: response.RefID });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send({ message: err.message });
      });
  })
);

// //unverified transactions
// zarinpal.UnverifiedTransactions().then(response =>
//   if (response.status === 100) {
//     console.log(response.authorities);
//   }
// }).catch(err => {
//   console.error(err);
// });

// //refres authority
// zarinpal.RefreshAuthority({
//   Authority: '000000000000000000000000000000000000',
//   Expire: '1800'
// }).then(response => {
//   if (response.status === 100) {
//     console.log(response.status);
//   }
// }).catch(err => {
//   console.error(err);
// });

module.exports = router;
