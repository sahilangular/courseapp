import connectDb from "@/app/utils/database";
import userModal from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import cloudinary from "@/app/cloudinary/cloudinary";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const id = req.nextUrl.pathname.split("deleteuser/")[1];

  const user = await userModal.findById(id);

  const instance = new Razorpay({
    key_id: "rzp_test_YOu2D0384qG2tn",
    key_secret: "5b6yngB4kbx8adc0hz6VGV2E",
  });

  const subscriptionId = user.subscription.id;

  if(subscriptionId){
    await instance.subscriptions.cancel(subscriptionId);
  }
  //delete from cloudinary

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  await userModal.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
    message: "Delete user successfully",
  });
};
