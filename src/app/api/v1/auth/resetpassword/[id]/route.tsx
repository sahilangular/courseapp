import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import { NextApiRequest } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import connectDb from "@/app/utils/database";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  await connectDb();
  const { password,confirmPassword } = await req.json();
  console.log(password,confirmPassword)

  if (!password || !confirmPassword) {
    return NextResponse.json({
      message: "please enter fields",
      status: 404,
      success:false
    });
  }
  if (password !== confirmPassword) {
    return NextResponse.json({
      message: "passwords do not match",
      success:false
    })
  }

  const token = req.url?.split("resetpassword/")[1];

  const user = await userModel.findOne({ token });

  if (!user) {
    return NextResponse.json({
      message: "invalid token or token expired",
    });
  }

  user.password = await user.hashPassword(password);
  await user.save();

  return NextResponse.json({
    success: true,
    message: "reset password successfully",
  });
};
