import coursemodel from "../../../../models/course";
import connectDb from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import getDataUri from "@/app/utils/dataUri";
import { NextApiRequest } from "next";

//get all courses without lecture
export const GET = async (req: NextRequest, res: NextResponse) => {
  connectDb();

  const keyword: string | null = req.nextUrl.searchParams.get("keyword");
  const category: string | null = req.nextUrl.searchParams.get("category");

  const courses = await coursemodel
    .find({
      title: {
        $regex: keyword ? keyword : "",
        $options: "i",
      },
      category: {
        $regex: category ? category : "",
        $options: "i",
      },
    })
    .select("-lectures");
  return NextResponse.json({
    success: true,
    courses,
  });
};

//create courses - admin
export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const { title, description, category, createdBy, public_id, url } =await req.json();

  console.log(title,description,category,createdBy,public_id,url)

  if (!title || !description || !category || !createdBy || !public_id || !url) {
    console.log("please add all fields");
  }

  await coursemodel.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: public_id,
      url: url,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Course created successfully,you can add lecture now",
  });
};
