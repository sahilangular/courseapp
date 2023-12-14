import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import {isAuthenticated} from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectDb();
  let userInfo = await isAuthenticated();
  const user = await userModel.findById(userInfo._id);
  if(!user){
    return NextResponse.json({message:"unauthorized"})
  }
  return NextResponse.json({
    success: true,
    user,
  });
};
