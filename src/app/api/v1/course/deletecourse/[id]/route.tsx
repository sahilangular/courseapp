import connectDb from "@/app/utils/database";
import courseModal from "@/models/course";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  cloudinary.v2.config({
    cloud_name: "dcalpdjki",
    api_key: "798424811229976",
    api_secret: "YopMQHxAqZpOvzmSEoH5ycVYWjQ",
  });

  const id = req.nextUrl.pathname.split("deletecourse/")[1];

  const course = await courseModal.findById(id);

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length.length; i++) {
    const sinleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(sinleLecture.video.Public_id,{
      resource_type :"video"
    });
  }

  await courseModal.deleteOne({ _id: course._id });

  return NextResponse.json({
    success: true,
    message: "Delete course successfully",
  });
};
