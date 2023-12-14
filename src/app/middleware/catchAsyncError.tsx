import { NextRequest, NextResponse } from "next/server"

export const catchAsyncError=(myFunc:any)=>(req:NextRequest,res:NextResponse)=>{
    Promise.resolve(myFunc(req,res)).catch(error=>{
        console.log(error)
    })
}