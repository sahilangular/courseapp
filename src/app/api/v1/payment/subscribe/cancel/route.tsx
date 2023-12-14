import { isAuthenticated } from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";
import payment from "@/models/payment";
import RezorPay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const instance = new RezorPay({
    key_id: "rzp_test_YOu2D0384qG2tn",
    key_secret: "5b6yngB4kbx8adc0hz6VGV2E",
  });

  const user = await isAuthenticated();
  console.log(user);

  const subscriptionId = user.subscription.id;
  let refund = false;

  const cancelpayment = await instance.subscriptions.cancel(subscriptionId);

  const Payment = await payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  const gap = Date.now() - Payment.createdAt;

  const refundTime = 7 * 24 * 60 * 60 * 1000;

  if (refundTime > gap) {
    await instance.payments.refund(Payment.razorpay_payment_id, {
      amount: "299",
      speed: "normal",
    });
    refund = true;
  }

  await payment.deleteOne({
    razorpay_subscription_id: subscriptionId,
  });

  (user.subscription.id = undefined), (user.subscription.status = undefined);

  await user.save();

  return NextResponse.json({
    success: true,
    message: refund
      ? "Subscription cancelled ,you will receive full refund within 7 days"
      : "Subscription cancelled,Now refund initiated as subscription was cancelled after 7",
  });
};
