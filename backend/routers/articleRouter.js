// const express = require("express");
// const expressAsyncHandler = require("express-async-handler");
// const Article = require("../db/models/Article");
// const { isAdmin, isAuth } = require("../utils");

// const router = express.Router();

// //for products
// router.post(
//   "/",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const article = new Article({
//         title: "sample title",
//         body: "this is sample body",
//         thumbnail: "/baners/vilcher.jpg",
//       });
//       const savedArticle = await article.save();

//       res.status(201).send({ article: savedArticle });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "قادر ساخت مقاله  نیستیم" });
//     }
//   })
// );

// router.get(
//   "/all",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const limit = parseInt(req.query.limit);
//       const page = parseInt(req.query.page);
//       const startIndex = (page - 1) * limit;

//       let result = {};

//       result.counts = await Article.countDocuments();
//       result.articles = await Article.find()
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .skip(startIndex);

//       res.status(200).send(result);
//     } catch (error) {
//       res.status(500).send({ message: "قادر به نمایش مقالات نیستیم" });
//     }
//   })
// );

// router.get(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const article = await Article.findById(req.params.id);
//       if (!article) {
//         return res.status(404).send({ message: "مقاله ای پیدا نشد" });
//       }
//       article.views += 1;
//       await article.save();
//       res.status(200).send(article);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "قادر به بازگرداندن مقاله نیستیم" });
//     }
//   })
// );

// router.put(
//   "/:id",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     try {
//       console.log("req.body update", req.body);
//       const confirmedArticle = await Article.findByIdAndUpdate(req.params.id, {
//         ...req.body,
//       });

//       res.status(200).send({ article: confirmedArticle });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "قادر به آپدیت کردن مقاله نیستیم" });
//     }
//   })
// );

// router.put(
//   "/like/:id",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const article = await Article.findById(req.params.id);
//       if (!article) {
//         return res.status(404).send({ message: "نظری یافت نشد" });
//       } else {
//         console.log("req.body", req.body.ip, req.body.like);
//         if (req.body.like) {
//           if (article.likedUserIps.includes(req.body.ip)) {
//             console.log("in include ip");
//             return res
//               .status(404)
//               .send({ message: "شما قبلا این مقاله را لایک کردید" });
//           } else {
//             console.log("in like");
//             article.likes += 1;
//             article.likedUserIps.push(req.body.ip);
//           }
//         } else {
//           console.log("in dislike");
//           const newLikeUserIps = article.likedUserIps.filter(
//             (x) => x !== req.body.ip
//           );
//           article.likedUserIps = newLikeUserIps;
//           article.likes -= 1;
//         }
//         await article.save();
//         return res.status(200).send({ message: "عملیات با موفقیت انجام شد" });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "قادر به انجام عملیات نیستیم" });
//     }
//   })
// );

// router.delete(
//   "/:id",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const deletedArticle = await Article.findByIdAndDelete(req.params.id);
//       if (!deletedArticle) {
//         res.status(404).send({ message: "مقاله ای یافت نشد" });
//       } else {
//         res.status(200).send({ article: deletedArticle });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "قادر به حذف نیستیم" });
//     }
//   })
// );

// module.exports = router;
