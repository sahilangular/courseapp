import RezorPay from "razorpay";
import connectDb from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/app/middleware/isAuthenticate";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  let user = await isAuthenticated();
  if (!user || user.role === "admin") {
    return NextResponse.json({
      message: "user not found or admin can't buy subscription",
      success: false,
    });
  }

  const instance = new RezorPay({
    key_id: "rzp_test_YOu2D0384qG2tn",
    key_secret: "5b6yngB4kbx8adc0hz6VGV2E",
  });

  const subscription = await instance.subscriptions.create({
    plan_id: "plan_N7v6DQgnkrcg5Y",
    total_count: 12,
    customer_notify: 1,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  return NextResponse.json({
    success: true,
    subscriptionId: subscription.id,
  });
};
