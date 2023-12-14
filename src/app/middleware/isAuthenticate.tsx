import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import userModel from "@/models/user";
import connectDb from "../utils/database";
import user from "@/models/user";

export async function isAuthenticated() {
  await connectDb();
  const token: any = cookies().get("token");
  const { payload } = await jwtVerify(token.value,
    new TextEncoder().encode("adcnijbdcibwibdcbsldkcnon")
  );
  const user = await userModel.findById(payload._id);
  return user;
}

// export const authRole = async (req: NextRequest, res: NextResponse) => {
//   const userData = await isAuthenticated();
//   if (userData.role !== "admin") {
//     return NextResponse.json({
//       message: `${userData.role} is not allowed to access this resource`,
//       status: 401,
//     });
//   }
//   NextResponse.next()
// };
