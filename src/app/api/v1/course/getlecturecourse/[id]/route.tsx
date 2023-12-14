import courseModal from "@/models/course";
import connectDb from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

//get lectures from course id
export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectDb();
  const course = await courseModal.findById(
    req.nextUrl.pathname.split("getlecturecourse/")[1]
  );

  if (!course) {
    return NextResponse.json({
      message: "course not found",
      success: false,
    });
  }

  course.views += 1;

  await course.save();

  return NextResponse.json({
    success: true,
    lectures: course.lectures,
  });
};
