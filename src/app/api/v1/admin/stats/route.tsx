import connectDb from "@/app/utils/database";
import stats from "@/models/stats";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectDb();

  const adminStats = await stats.find({}).sort({createdAt:"desc"}).limit(12)

  return NextResponse.json({
    success: true,
  });
};
