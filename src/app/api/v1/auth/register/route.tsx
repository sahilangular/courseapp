import connectDb from "@/app/utils/database";
import { sendToken } from "@/app/utils/sendToken";
import userModal from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrupt from "bcrypt";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const { name, email, password,public_id,url} = await req.json();

  if (!name || !email || !password) {
    console.log("please add all fields");
  }

  let user = await userModal.findOne({ email: email });

  if (user) {
    return NextResponse.json({
      message: "user already exist",
      success: false,
    });
  }

  user = await userModal.create({
    name,
    email,
    password,
    avatar: {
      public_id: public_id,
      url: url,
    },
  });

  user.password = await bcrupt.hash(user.password, 10);
  await user.save();

  await sendToken(user);

  return NextResponse.json({
    success: true,
    message: "Register Successfully",
    user,
  });
};
