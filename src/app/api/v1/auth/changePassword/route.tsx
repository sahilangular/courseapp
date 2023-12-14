import { NextResponse } from "next/server";
import userModel from "@/models/user";
import connectDb from "@/app/utils/database";
import {isAuthenticated} from "@/app/middleware/isAuthenticate";

export const PUT = async (req: any, res: NextResponse) => {
  await connectDb();
  const { oldPassword, newPassword } = await req.json();

  if (!oldPassword || !newPassword) {
    return NextResponse.json({
      message: "please enter all fields",
      success: false,
    });
  }

  if (oldPassword === newPassword) {
    return NextResponse.json({
      message: "new password cannot same as old password",
      success:false
    });
  }

  let userInfo = await isAuthenticated();

  const user = await userModel.findById(userInfo._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    return NextResponse.json({ 
      message: "Incurrect  password" ,
      success: false,
    });
  }

  const hashPassword = await user.hashPassword(newPassword)

  user.password = hashPassword;
  await user.save();

  return NextResponse.json({
    success: true,
    message: "password change successfully",
  });
};
