import mongoose, { model } from "mongoose";

const paymentModel = new mongoose.Schema({
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  razorpay_subscription_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const payment = (module.exports =
  mongoose.models.payment || mongoose.model("payment", paymentModel));

export default payment;
