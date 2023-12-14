import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest, res: NextResponse) => {
  cookies().delete("token");
  cookies().delete("user");

  return NextResponse.json({
    success: true,
    message: "logout Successfully",
  });
};
