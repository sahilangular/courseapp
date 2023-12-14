import { NextRequest, NextResponse } from "next/server";
import courseModal from "@/models/course";
import {isAuthenticated} from "@/app/middleware/isAuthenticate";
import connectDb from "@/app/utils/database";

export const DELETE = async (req: NextRequest, res: NextResponse) => {

  await connectDb(); 
  let userInfo = await isAuthenticated();

  if (!userInfo) {
    return NextResponse.json({
      message: "login first",
      status: 404,
    });
  }

  const course = await courseModal.findById(req.nextUrl.searchParams.get('id'));

  if (!course) {
    return NextResponse.json({
      message: "invalid course id",
      status: 404,
    });
  }

//   if(!userInfo.Playlist){
//     return NextResponse.json({
//         message:'no course in the list',
//         status:401,
//     })
//   }
  const newPlayList = userInfo.Playlist.filter((item: any) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  userInfo.Playlist = newPlayList;

  await userInfo.save();

  return NextResponse.json({
    success: true,
    message: "remove course from list successfully",
  });
};
