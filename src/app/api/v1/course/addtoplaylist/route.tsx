import { NextRequest, NextResponse } from "next/server";
import courseModal from "@/models/course";
import {isAuthenticated} from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();
  const { id } = await req.json();
  let userInfo = await isAuthenticated();

  if (!userInfo) {
    return NextResponse.json({
      message: "login first",
      status: 404,
    });
  }

  const course = await courseModal.findById(id);

  if (!course) {
    return NextResponse.json({
      message: "invalid course id",
      status: 404,
    });
  }

  const itemExist = userInfo.Playlist.find((item: any) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) {
    return NextResponse.json({
      message: "this course already exist in your playlist",
      status: 401,
    });
  }

  userInfo.Playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await userInfo.save();

  return NextResponse.json({
    success: true,
    message: "course added successfully",
  });
};
