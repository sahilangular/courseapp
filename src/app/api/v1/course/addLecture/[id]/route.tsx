import courseModal from "@/models/course";
import connectDb from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

//add lectures in course
export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const id = req.nextUrl.pathname.split("addLecture/")[1];
  const { title, description, public_id, url } = await req.json();
  console.log(title, description, public_id, url);
  const course = await courseModal.findById(id);

  if (!course) {
    return NextResponse.json({
      message: "course not found",
      success: false,
    });
  }

  course.lectures.push({
    title,
    description,
    video: {
      Public_id: public_id,
      Url: url,
    },
  });

  //video upload to cloudinary

  course.numOfVideos = course.lectures.length;

  await course.save();

  return NextResponse.json({
    success: true,
    message: "lecture added successfully",
  });
};
