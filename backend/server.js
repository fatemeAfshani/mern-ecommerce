const express = require("express");
require("./db/mongoose");
const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
const path = require("path");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");
const uploadRouter = require("./routers/uploadRouter");
const commentRouter = require("./routers/commentRouter");
const categoryRouter = require("./routers/categoryRouter");
const paymentRouter = require("./routers/paymentRouter");
// const articleRouter = require("./routers/articleRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(helmet());
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/comments", commentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/payment", paymentRouter);
// app.use("/api/articles", articleRouter);

const uploadPath = path.join(__dirname, "../frontend/public/uploads");

app.use("/uploads", express.static(uploadPath));

if (process.env.DEPLOY_MODE === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  );
  // app.use(
  //   rateLimit({
  //     windowMs: 10 * 60 * 1000, // 10 minutes
  //     max: 100, // limit each IP to 100 req
  //   })
  // );
}
//this is for express async hanlder
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is up and running on port ", process.env.PORT);
});
