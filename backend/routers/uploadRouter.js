const express = require("express");
const multer = require("multer");
const { isAuth } = require("../utils");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", isAuth, upload.array("images", 10), (req, res) => {
  const imagesPath = req.files.map((file) => {
    const filePath = file.path.replace(/\\/g, "/").split("/");
    const imagePath = `/uploads/${filePath[filePath.length - 1]}`;
    return imagePath;
  });
  res.send(imagesPath);
});

module.exports = router;
