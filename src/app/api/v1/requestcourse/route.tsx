import connectDb from "@/app/utils/database";
import sendEmail from "@/app/utils/sendemail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

  const { name, email, course } = await req.json();

  if (!name || !email || !course) {
    return NextResponse.json({
      message: "All fields are mandatory",
      success: false,
    });
  }

  const to = "Sahil Dalvi <sahildalvi738@gmail.com>";
  const subject = "Requesting for a course on courseBundler";
  const text = `i am ${name} and my email is ${email}. \n ${course}.`;

  await sendEmail({
    to: to,
    subject: subject,
    message: text,
    from: email,
  });

  return NextResponse.json({
    success: true,
    message: "your request mail has been sent",
  });
};
