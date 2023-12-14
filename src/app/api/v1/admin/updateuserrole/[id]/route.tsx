import { isAuthenticated } from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";
import userModal from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const loginUser = await isAuthenticated();

  if (!loginUser) {
    return NextResponse.json({
      message: "login first with admin credentials",
      status: false,
    });
  }

  const id = req.nextUrl.pathname.split("updateuserrole/")[1];

  const user = await userModal.findById(id);

  if (!user) {
    return NextResponse.json({
      message: "user not found",
      success: false,
    });
  }

  if (user.role === "user") {
    user.role = "admin";
  } else {
    user.role = "user";
  }

  await user.save()

  return NextResponse.json({
    success: true,
    message: "Role updated successfully",
    user,
  });
};
