import { isAuthenticated } from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";
import userModal from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const user = await isAuthenticated();

  await userModal.findByIdAndDelete(user._id);

  //cancel subscription

  //delete from cloudinary

  cookies().delete("token");
  cookies().delete("user");

  return NextResponse.json({
    success: true,
    message: `${user.name} delete your account successfully`,
  });
};
