"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Grid, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { getCourseLecture } from "@/app/redux/action/course";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loader from "../../component/layout/Loader/page";

const Page = () => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  const { lectures, success, loading } = useSelector(
    (state: any) => state.courses
  );

  const { user } = useSelector((state: any) => state.user);

  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLecture(params.id));
  }, [dispatch, params.id]);

  if (
    user?.role !== "admin" &&
    (user?.subscription?.id === undefined ||
      user?.subscription?.status !== "active")
  ) {
    router.push("/subscribe");
  }

  return (
    <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box>
            <ReactPlayer
              url={lectures[lectureNumber]?.video.url}
              width="100%"
              height={"75%"}
              controls
            />
            <Heading m={[4, 2]} textAlign={["center", "left"]}>{`#${
              lectureNumber + 1
            } ${lectures[lectureNumber]?.title}`}</Heading>

            <Heading m={2} textAlign={["center", "left"]}>
              Description
            </Heading>
            <Text m={4} textAlign={["center", "left"]}>
              {lectures[lectureNumber]?.description}
            </Text>
          </Box>
          <VStack>
            {lectures.map((element: any, index: any) => (
              <button
                key={index}
                style={{
                  width: "100%",
                  padding: "1rem",
                  textAlign: "center",
                  margin: "0",
                  borderBottom: "1px solid rgba(0,0,0,0.2)",
                }}
                onClick={() => setLectureNumber(index)}
              >
                <Text noOfLines={1}>
                  #{index + 1}
                  {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      )}
    </Grid>
  );
};

export default Page;
