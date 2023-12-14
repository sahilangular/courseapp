import { NextResponse } from "next/server";
import userModel from "@/models/user";
import connectDb from "@/app/utils/database";
import {isAuthenticated} from "@/app/middleware/isAuthenticate";

export const PUT = async (req: any, res: NextResponse) => {
  await connectDb();
  const { name, email } = await req.json();

  let userInfo = await isAuthenticated();

  const user = await userModel.findById(userInfo._id)


 if(name) user.name = name;
  if(email)user.email = email;

  await user.save();

  return NextResponse.json({
    success: true,
    message: "update profile successfully",
  });
};
