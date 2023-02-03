const express = require("express");
const Category = require("../db/models/Category");
const { categories } = require("../data");
const { isAuth } = require("../utils");
const router = express.Router();

router.get("/add", async (req, res) => {
  try {
    const savedCategories = await Category.insertMany(categories);
    res.send(savedCategories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: " unable to get all categories" });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const category = await Category.findOne({
      name: req.params.name !== "all" ? req.params.name : "/",
    });
    let children = [];
    if (category) {
      children = await Category.find({
        parent:
          category.name !== "/"
            ? category.parent !== "/"
              ? `${category.parent}/${category.name}`
              : `/${category.name}`
            : "/",
      });
    }
    res.send({ category, children });
  } catch (error) {
    res.status(400).send({ message: "دسته بندی مورد نظر یافت نشد" });
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/:id", isAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400).send({ message: "دسته بندی موجود نیست" });
    } else {
      await category.remove();
      res.send(category);
    }
  } catch (error) {
    res.status(500).send({ message: "unable to delete category" });
  }
});

module.exports = router;
