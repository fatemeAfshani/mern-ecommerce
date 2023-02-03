const express = require("express");
const { data } = require("../data");
const router = express.Router();
const Product = require("../db/models/Product");
const expressAsyncHandler = require("express-async-handler");
const { isAdmin, isAuth } = require("../utils");
const upload = require("multer")();
const fs = require("fs");

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const addedProduct = await Product.insertMany(data.products);
    res.send(addedProduct);
  })
);

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const startIndex = (page - 1) * limit;

    const name = req.query.name || "";
    const category = req.query.category || "";
    const max = req.query.max || "";
    const min = req.query.min || "";
    const order = req.query.order || "";

    const categoryFilter = category
      ? { category: { $regex: category, $options: "i" } }
      : {};
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "newest"
        ? { updatedAt: -1 }
        : { updatedAt: -1 };

    try {
      let result = {};
      const documentcounts = await Product.countDocuments({
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
      }).exec();

      result.counts = documentcounts;

      result.products = await Product.find({
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
      })
        .sort(sortOrder)
        .limit(limit)
        .skip(startIndex);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  })
);

router.get(
  "/home",
  expressAsyncHandler(async (req, res) => {
    const limit = 10;
    const category1 = req.query.category1 || "";
    const categoryFilter1 = category1
      ? { category: { $regex: category1, $options: "i" } }
      : {};

    const category2 = req.query.category2 || "";
    const categoryFilter2 = category2
      ? { category: { $regex: category2, $options: "i" } }
      : {};

    const category3 = req.query.category3 || "";
    const categoryFilter3 = category3
      ? { category: { $regex: category3, $options: "i" } }
      : {};

    const sortOrder = { updatedAt: -1 };

    let mainProducts = [];
    let products1 = [];
    let products2 = [];
    mainProducts = await Product.find({
      ...categoryFilter1,
    })
      .limit(limit)
      .sort(sortOrder);
    products1 = await Product.find({
      ...categoryFilter2,
    })
      .limit(limit)
      .sort(sortOrder);
    products2 = await Product.find({
      ...categoryFilter3,
    })
      .limit(limit)
      .sort(sortOrder);

    res.send({ mainProducts, products1, products2 });
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });

    if (!product) {
      res.status(404).send({ message: "product not found." });
    }
    res.send(product);
  })
);

router.get(
  "/relaited/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
      const relaited = await Product.find({ category: product.category }).limit(
        10
      );

      if (relaited) {
        if (relaited.length > 5) {
          res.send(relaited);
        } else {
          const categorySeperated = product.category.split("/");
          let requestedCategory = "";
          for (let i = 1; i < categorySeperated.length - 1; i++) {
            requestedCategory = `/${categorySeperated[i]}`;
          }

          const numberOfRelaitedProducts = 5;

          const additionalRelaited = await Product.find({
            category: { $regex: requestedCategory, $options: "i" },
          }).limit(numberOfRelaitedProducts);

          res.send(additionalRelaited);
        }
      } else {
        res
          .status(404)
          .send({ messsage: "قادر به یافتن محصولات مشابه نیستیم" });
      }
    }
  })
);

router.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "محصول جدید" + Date.now(),
      searchName: "محصول-جدید" + Date.now(),
      images: ["/uploads/walker1.jpeg"],
      category: "/پزشکی/ماسک",
      price: "160000",
      weight: 500,
      code: "01",
      InStock: true,
      description:
        "این محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.ین محصول یک واکر با چهار پایه است.",
      features: ["ویژگی۱"],
    });
    const savedProduct = await product.save();
    res.send({ message: "محصول ساخته شد", product: savedProduct });
  })
);

router.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
      if (req.body.images) {
        product.images.forEach((image) => {
          const path = image.split("/uploads");
          if (path[1] !== "/walker1.jpeg")
            fs.unlinkSync("./frontend/public/uploads" + path[1]);
        });

        product.images = req.body.images;
      }
      (product.name = req.body.name),
        (product.searchName = req.body.searchName),
        (product.category = req.body.category),
        (product.price = req.body.price),
        (product.weight = req.body.weight),
        (product.code = req.body.code),
        (product.InStock = req.body.InStock),
        (product.description = req.body.description),
        (product.features = req.body.features);
      const UpdatedProduct = await product.save();
      res.send({ message: "محصول به روز رسانی شد", product: UpdatedProduct });
    } else {
      res.status(404).send({ message: "محصول مورد نظر یافت نشد" });
    }
  })
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const removedProduct = await Product.findByIdAndRemove({
        _id: req.params.id,
      });
      removedProduct.images.forEach((image) => {
        const path = image.split("/uploads");
        fs.unlinkSync("./frontend/public/uploads" + path[1]);
      });
      res.send({ message: "محصول حذف گردید", product: removedProduct });
    } catch (error) {
      console.log("error", error);
      res.send({ message: "امکان حذف محصول مورد نظر وجود ندارد" });
    }
  })
);

router.get(
  "/ad/emall",
  expressAsyncHandler(async (req, res) => {
    try {
      const limit = req.query.size ? parseInt(req.query.size) : 100;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const startIndex = (page - 1) * limit;

      const result = await Product.find()
        .sort({ updatedAt: -1 })
        .limit(limit)
        .skip(startIndex);

      let products = [];
      result.forEach((product) => {
        let pro = {
          id: product._id,
          title: product.name,
          url: `/products/${product.searchName}?id=${product._id}`,
          price: product.price,
          old_price: null,
          is_available: product.InStock,
        };
        products.push(pro);
      });
      return res.status(200).send({ success: true, products });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  })
);

router.post(
  "/ad/torob/products",
  upload.none(),
  expressAsyncHandler(async (req, res) => {
    try {
      const productId = req.body.page_unique;
      const productLink = req.body.page_url;
      const page = req.body.page ? parseInt(req.body.page) : 1;

      const limit = 100;
      const startIndex = (page - 1) * limit;

      if (!productId && !productLink) {
        const documentcounts = await Product.countDocuments().exec();
        const max_pages = Math.ceil(documentcounts / limit);

        const result = await Product.find()
          .sort({ updatedAt: -1 })
          .limit(limit)
          .skip(startIndex);

        let products = [];
        result.forEach((product) => {
          let pro = {
            title: product.name,
            page_unique: product._id,
            current_price: product.price,
            availability: product.InStock ? "instock" : false,
            image_link: `https://sample.ir${product.images[0]}`,
            page_url: `https://sample.ir/products/${product.searchName}?id=${product._id}`,
          };
          products.push(pro);
        });
        return res
          .status(200)
          .send({ count: documentcounts, max_pages, products });
      } else if (productId) {
        const product = await Product.findOne({ _id: productId });
        return res.status(200).send({
          title: product.name,
          page_unique: product._id,
          current_price: product.price,
          availability: product.InStock ? "instock" : false,
          image_link: `https://sample.ir${product.images[0]}`,
          page_url: `https://sample.ir/products/${product.searchName}?id=${product._id}`,
        });
      } else if (productLink) {
        const splited = productLink.split("?");
        const id = splited[1].split("=")[1];
        const product = await Product.findOne({ _id: id });
        return res.status(200).send({
          title: product.name,
          page_unique: product._id,
          current_price: product.price,
          availability: product.InStock ? "instock" : false,
          image_link: `https://sample.ir${product.images[0]}`,
          page_url: `https://sample.ir/products/${product.searchName}?id=${product._id}`,
        });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  })
);

module.exports = router;
