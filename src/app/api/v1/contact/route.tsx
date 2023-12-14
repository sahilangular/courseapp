import connectDb from "@/app/utils/database";
import sendEmail from "@/app/utils/sendemail";
import { NextRequest, NextResponse } from "next/server";

//add lectures in course
export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({
      message: "All fiels are mandatory",
      status: 401,
    });
  }

  const to = "Sahil Dalvi <sahildalvi738@gmail.com>";
  const subject = "problems about the website or the course/lectures related";
  const text = message;

  await sendEmail({
    to: to,
    subject: subject,
    message: text,
    from: email,
  });

  return NextResponse.json({
    success: true,
    message: "Thanks for your feedback , we will help you soon.",
  });
};
