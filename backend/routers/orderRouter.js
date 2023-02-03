const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth, isAdmin } = require("../utils");
const Order = require("../db/models/Order");
const moment = require("moment");
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
      const documentcounts = await Order.countDocuments().exec();
      result.counts = documentcounts;
      result.orders = await Order.find()
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .skip(startIndex)
        .populate("user");

      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e.message });
    }
  })
);

router.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * limit;

    try {
      let result = {};
      const documentcounts = await Order.countDocuments({
        user: req.user._id,
      }).exec();
      result.counts = documentcounts;

      result.orders = await Order.find({ user: req.user._id })
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
  "/track/:trackingCode",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({
      trackingCode: req.params.trackingCode,
    });
    if (!order) {
      res.status(404).send({ message: "سفارشی با این شماره پیگیری یافت نشد" });
    } else {
      res.send({ orderId: order._id });
    }
  })
);

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      if (req.body.productItems.length === 0) {
        res.status(401).send({ message: "سبد خرید شما خالی است " });
      } else {
        const order = new Order({
          productItems: req.body.productItems,
          shippingAddress: {
            ...req.body.shippingAddress,
            phoneNumber: req.user.phoneNumber,
          },
          trackingCode: req.body.trackingCode,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          postPrice: req.body.postPrice,
          totalPrice: req.body.totalPrice,
          totalWeight: req.body.totalWeight,
          user: req.user._id,
        });
        const savedOrder = await order.save();
        const message = `فروشگاه اینترنتی  \n با تشکر از خرید شما\n شماره پیگیری${req.body.trackingCode} `;
        const smsResult = await client.manualSendCode(
          req.user.phoneNumber,
          message
        );
        const smsResult2 = await client.manualSendCode(
          "09123456789",
          "سفارش جدیدی ثبت شده، لطفا  پنل ادمین  رو  چک کن!"
        );

        if (smsResult.error || smsResult2.error) {
          res
            .status(201)
            .send({ message: "سفارش ثبت گردید", order: savedOrder });
        } else {
          res
            .status(201)
            .send({ message: "سفارش ثبت گردید", order: savedOrder });
        }
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ message: " قادر به ثبت سفارش نیستیم" });
    }
  })
);

router.get(
  "/admin/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send({ order });
    } else {
      res.status(404).send({ message: "سفارش مورد نظر یافت نشد." });
    }
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send({ order });
    } else {
      res.status(404).send({ message: "سفارش مورد نظر یافت نشد." });
    }
  })
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndRemove({
        _id: req.params.id,
      });

      res.send({ message: "سفارش با موفقیت حذف گردید", order: deletedOrder });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ message: " قادر به حذف سفارش نیستیم" });
    }
  })
);

router.get(
  "/cancel/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const canceledOrder = await Order.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          isCanceled: true,
        },
        {
          new: true,
        }
      );

      res.send({ message: "سفارش با موفقیت کنسل گردید", order: canceledOrder });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ message: " قادر به کنسل کردن سفارش نیستیم" });
    }
  })
);
router.put(
  "/:id/deliver",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deliverMessage = req.body.message || "";
    const order = await Order.findById({ _id: req.params.id });
    if (order) {
      order.isDelivered = true;
      const time = moment().format("YYYY-MM-DD HH:mm a");
      order.deliveredAt = time;
      order.deliverMessage = deliverMessage;
      const updatedOrder = await order.save();
      res.send({ message: "سفارش به روز رسانی شد", order: updatedOrder });
    } else {
      res.status(404).send({ message: "سفارش مورد نظر یافت نشد" });
    }
  })
);

router.put(
  "/:id/pay",
  expressAsyncHandler(async (req, res) => {
    if (!req.body.paymentId) {
      return res.status(400).send({ message: "no paymnetId found" });
    }
    const order = await Order.findById({ _id: req.params.id });
    if (order) {
      order.isPaid = true;
      const time = moment().format("YYYY-MM-DD HH:mm a");
      order.paymentId = req.body.paymentId;
      order.paidAt = time;
      const updatedOrder = await order.save();
      res.send({ message: "سفارش به روز رسانی شد", order: updatedOrder });
    } else {
      res.status(404).send({ message: "سفارش مورد نظر یافت نشد" });
    }
  })
);

module.exports = router;
