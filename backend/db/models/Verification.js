const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    phoneNumber: { type: Number, required: true, unique: true },
    code: {
      type: Number,
      required: true,
    },
    numberOfTrying: {
      type: Number,
      default: 0,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 1800 } },
  },
  {
    timestamps: true,
  }
);

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;
