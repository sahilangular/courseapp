import connectDb from "@/app/utils/database";
import { sendToken } from "@/app/utils/sendToken";
import userModal from "@/models/user";
import { cookies } from "next/headers";
import USER from "@/app/globals";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const { email, password } = await req.json();

  //   const file = req.file

  if (!email || !password) {
    console.log("please add all fields");
  }

  let user = await userModal.findOne({ email: email }).select("+password");

  if (!user) {
    return NextResponse.json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return NextResponse.json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  await sendToken(user);

  // USER.isLogin=true;
  // USER.role = user.role;

  return NextResponse.json({
    success: true,
    message: `welcome back,${user.name}`,
    user,
  });
};
