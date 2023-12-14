import { isAuthenticated } from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Crypto from "crypto";
import payment from "@/models/payment";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } =
    await req.json();
  const user = await isAuthenticated();

  const subscription_id = user.subscription.id;

  const generated_signature = Crypto.createHmac(
    "sha256",
    "5b6yngB4kbx8adc0hz6VGV2E"
  )
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;

  if (!isAuthentic)
    return NextResponse.json({
      message: "payment failed",
      success: false,
    });

  await payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id,
  });

  user.subscription.status = "active";

  await user.save();

  cookies().delete("user");

  cookies().set("user", JSON.stringify(user), {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });

  return NextResponse.json({
    message: "payment successfull",
    success: true,
  });
};
