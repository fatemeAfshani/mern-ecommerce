const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const Comment = require("../db/models/Comment");
const { isAdmin, isAuth } = require("../utils");

const router = express.Router();

//for contacts
router.post("/contact", async (req, res) => {
  try {
    const comment = new Comment({
      username: req.body.name,
      comment: req.body.comment,
    });
    const savedComment = await comment.save();
    res.send(savedComment);
  } catch (error) {
    res.status(500).send({ message: "قادر به ذخیره نظر نیستیم" });
  }
});

//for products
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const time = moment().format("YYYY-MM-DD HH:mm a");
      const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        product: req.body.productId,
        time,
      });
      const savedComment = await comment.save();

      res.status(201).send({ savedComment });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "قادر به ذخیره نظر نیستیم" });
    }
  })
);

router.get(
  "/all",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const page = parseInt(req.query.page);
      const startIndex = (page - 1) * limit;

      let result = {};

      result.counts = await Comment.countDocuments({ isConfirmed: false });
      result.comments = await Comment.find({ isConfirmed: false })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(startIndex);

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: "قادر به نمایش نظرات نیستیم" });
    }
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const comments = await Comment.find({ product: req.params.id });
      res.status(200).send(comments);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "قادر به بازگرداندن نظرات نیستیم" });
    }
  })
);

router.put(
  "/confirm/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const confirmedComment = await Comment.findByIdAndUpdate(req.params.id, {
        isConfirmed: true,
      });
      if (!confirmedComment) {
        res.status(404).send({ message: "نظری یافت نشد" });
      } else {
        res.status(200).send({ comment: confirmedComment });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "قادر به تایید نظر نیستیم" });
    }
  })
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      if (!deletedComment) {
        res.status(404).send({ message: "نظری یافت نشد" });
      } else {
        res.status(200).send({ comment: deletedComment });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "قادر به حذف نیستیم" });
    }
  })
);

module.exports = router;
