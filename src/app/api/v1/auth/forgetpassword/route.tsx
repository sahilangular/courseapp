import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import sendEmail from "@/app/utils/sendemail";
import connectDb from "@/app/utils/database";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();
  const { email } = await req.json();

  const user = await userModel.findOne({ email: email });

  if (!user) {
    return NextResponse.json({
      message: "user not found",
      status: 400,
    });
  }

  const reseturl = `${req.nextUrl.origin}/resetpassword/${user.token}`;

  const message = `Click on the link to reset this password ${reseturl} .If you are not request then please ignore.`;

  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    message,
    from:'Sahil Dalvi <sahildalvi738@gmail.com>'
  });

  return NextResponse.json({
    success: true,
    message: `reset token has been sent to ${email}`,
  });
};
