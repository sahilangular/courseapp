import { NextRequest, NextResponse } from "next/server";
import courseModal from "@/models/course";
import connectDb from "@/app/utils/database";
import cloudinary from "cloudinary";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  cloudinary.v2.config({
    cloud_name: "dcalpdjki",
    api_key: "798424811229976",
    api_secret: "YopMQHxAqZpOvzmSEoH5ycVYWjQ",
  });

  const courseId = req.nextUrl.searchParams.get("courseId");
  const lectureId:any = req.nextUrl.searchParams.get("lectureId");

  const course = await courseModal.findById(courseId);

  console.log(course)

  if (!course) {
    return NextResponse.json({
      message: "invalid course id",
      status: 404,
      success:false
    });
  }

  const lecture = course.lectures.find((item: any) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  //delete from cloudinary

  await cloudinary.v2.uploader.destroy(lecture.video.Public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter((item: any) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  return NextResponse.json({
    success: true,
    message: "remove lecture from course successfully",
  });
};
