import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({
    success:true,
    key:"rzp_test_YOu2D0384qG2tn",
  });
};
