import connectDb from "@/app/utils/database";
import userModal from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  let user = await userModal.find()

  if (!user) {
    return NextResponse.json({
      message: "user not found",
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
    user,
  });
};
