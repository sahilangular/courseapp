import { isAuthenticated } from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";
import userModal from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  let user = await isAuthenticated();

  user = await userModal.findById(user._id);


  return NextResponse.json({
    success: true,
    message: "Register Successfully",
    user,
  });
};
