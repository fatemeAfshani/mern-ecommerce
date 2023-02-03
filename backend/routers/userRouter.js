const express = require("express");
const User = require("../db/models/User");
const expressAsyncHandler = require("express-async-handler");
const { isAuth, isAdmin, generateToken } = require("../utils");
const Verification = require("../db/models/Verification");
const client = require("../verificationFunc");
const router = express.Router();

router.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * limit;

    try {
      let result = {};
      const documentcounts = await User.countDocuments().exec();
      result.counts = documentcounts;
      result.users = await User.find()
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .skip(startIndex);

      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e.message });
    }
  })
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const users = [
      {
        phoneNumber: process.env.ADMIN_USERNAME,
        isAdmin: true,
      },
      {
        phoneNumber: process.env.ME_USERNAME,
        isAdmin: true,
      },
    ];
    const createdUsers = await User.insertMany(users);

    res.send(createdUsers);
  })
);

router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    try {
      if (req.body.phoneNumber.length !== 11) {
        return res.status(400).send({ message: "شماره تماس نامعتبر است" });
      }

      const code = Math.floor(100000 + Math.random() * 900000);

      const result = await client.manualSendCode(
        req.body.phoneNumber,
        ` فروشگاه اینترنتی  \n کد ورود: ${code}`
      );
      const verified = await Verification.findOne({
        phoneNumber: req.body.phoneNumber,
      });

      if (result.error) {
        console.log(result.error);
        return res
          .status(400)
          .send({ message: "قادر به ارسال کد به شماره مورد نظر نیستیم" });
      } else {
        if (verified) {
          verified.code = code;
          await verified.save();
          return res.send({ user: verified.phoneNumber });
        } else {
          const newVerfied = new Verification({
            phoneNumber: req.body.phoneNumber,
            code,
          });
          await newVerfied.save();
          return res.send({ user: newVerfied.phoneNumber });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: " متاسفانه مشکلی پیش آمده است" });
    }
  })
);
const chanceToLogin = 4;

router.post(
  "/verify",
  expressAsyncHandler(async (req, res) => {
    try {
      if(process.env.ENVIRONMENT = 'develop'){
        console.log("###here")
        const user = {isAdmin: true, phoneNumber: '09123456789' , _id: 1}
         return res.send({
            ...user,
            token: generateToken(user),
          });
    next()
  }
      const verified = await Verification.findOne({
        phoneNumber: req.body.phoneNumber,
      });
      if (!verified) {
        res.status(500).send({
          message: "شماره تلفن نامعتبر است. لطفا مجدد درخواست ارسال کد کنید",
        });
      } else if (req.body.code != verified.code) {
        if (verified.numberOfTrying > chanceToLogin) {
          return res.status(400).send({
            message:
              "تعداد اشتباهات شما بیش تر از حد مجاز است. لطفا پس از ۳۰ دقیقه مجددا امتحان کنید",
          });
        } else {
          verified.numberOfTrying += 1;
          await verified.save();
          return res.status(400).send({ message: "کد وارد شده اشتباه است" });
        }
      } else {
        //code is right
        await verified.remove();
        const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (!user) {
          const newUser = new User({ phoneNumber: req.body.phoneNumber });
          await newUser.save();
          return res.send({
            _id: newUser._id,
            phoneNumber: newUser.phoneNumber,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser),
          });
        } else {
          return res.send({
            _id: user._id,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: " متاسفانه مشکلی پیش آمده است" });
    }
  })
);

router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "کاربر مورد نظر یافت نشد" });
    }
  })
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    if (user) {
      if (user.isAdmin === true) {
        res.status(403).send({ message: "امکان حذف ادمین وجود ندارد" });
      } else {
        await user.remove();
        res.send({ message: "کاربر حذف شد", user: deletedUser });
      }
    } else {
      res.status(404).send({ message: "کاربر با این مشخصات وجود ندارد" });
    }
  })
);

module.exports = router;
