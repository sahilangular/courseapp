import { isAuthenticated } from "@/app/middleware/isAuthenticate";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import connectDb from "@/app/utils/database";

export const PUT = async (req: any, res: NextResponse) => {
  await connectDb();
  let user = await isAuthenticated();

  const { public_id, url } = await req.json();
  console.log("public_id", public_id, "url", url);

  cloudinary.v2.config({
    cloud_name: "dcalpdjki",
    api_key: "798424811229976",
    api_secret: "YopMQHxAqZpOvzmSEoH5ycVYWjQ",
  });

  if (user.avatar || user.avatar.public_id) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }

  user.avatar = {
    public_id: public_id,
    url: url,
  };

  await user.save();

  return NextResponse.json({
    success: true,
    message: "update profile picture successfully",
  });
};
