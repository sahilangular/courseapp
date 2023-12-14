import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest, res: NextResponse) {
  const cookie: any = cookies().get("user");
  const userData:any = JSON.parse(cookie.value);

  if (req.nextUrl.pathname.search("/getlecturecourse")) {
    if (
      userData?.subscription.status !== "active" &&
      userData.role !== "admin"
    ) {
      return NextResponse.json({
        message: `only subscribers access this resource`,
        status: 401,
      });
    }
  } else {
    if (userData?.role !== "admin") {
      return NextResponse.json({
        message: `${userData.role} not allowed to access this resource`,
        status: 401,
      });
    }
  }
}

export const config = {
  matcher: [
    // "/api/v1/course",
    "/api/v1/course/addLecture",
    "/api/v1/course/deletecourse/:id*",
    "/api/v1/admin/getallusers",
    "/api/v1/admin/updateuserrole/:id*",
    "/api/v1/admin/deleteuser/:id*",
    "/api/v1/course/getlecturecourse/:id*",
  ],
};
