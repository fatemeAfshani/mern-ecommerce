const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        weight: { type: String, required: true },
        searchName: { type: String },
        qty: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullname: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      fullAddress: { type: String, required: true },
      postalCode: { type: Number, required: true },
      phoneNumber: { type: Number, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentMethod: { type: String, required: true },
    forwardMethod: { type: String, default: "normal" },
    trackingCode: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: String },
    paymentId: { type: String },
    isDelivered: { type: Boolean, default: false },
    deliverMessage: { type: String },
    deliveredAt: { type: String },
    itemsPrice: { type: Number, required: true },
    postPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    totalWeight: { type: Number, required: true },
    isCanceled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
