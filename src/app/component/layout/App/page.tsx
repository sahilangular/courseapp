'use client'
import { loadUser } from "@/app/redux/action/userAction";
import { AppDispatch } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
      dispatch(loadUser());
  }, [dispatch]);

  return <div></div>;
};

export default Page;
