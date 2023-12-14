"use client";
import React, { useEffect, useState } from "react";
import "../home/home.css";
import {
  Image,
  Container,
  Heading,
  Input,
  Stack,
  HStack,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addToPlayList, getAllCourses } from "../redux/action/course";
import toast from "react-hot-toast";
import Loader from "../../app/component/layout/Loader/page";
import { loadUser } from "../redux/action/userAction";

const Course = ({
  title,
  views,
  imageSrc,
  id,
  playListHandler,
  creator,
  description,
  lectureCount,
}: {
  title: String;
  views: Number;
  imageSrc: string;
  playListHandler: any;
  id: String;
  creator: String;
  description: String;
  lectureCount: Number;
}) => {
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image
        src={imageSrc}
        alt="course image"
        boxSize={"60"}
        objectFit={"contain"}
      />
      <Heading
        textAlign={["center", "left"]}
        maxW={"300"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        size={"sm"}
      >
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>
      <HStack>
        <Text fontWeight={"bold"} textTransform={"uppercase"}>
          Creator
        </Text>

        <Text fontFamily={"body"} textTransform={"uppercase"}>
          {creator}
        </Text>
      </HStack>
      <Heading
        textAlign={"center"}
        size={"xs"}
        textTransform={"uppercase"}
      >{`lecture-${lectureCount}`}</Heading>
      <Heading
        size={"xs"}
        textTransform={"uppercase"}
      >{`views-${views}`}</Heading>
      <Stack direction={["column", "row"]} alignItems={"center"}>
        <Link href={`/courses/${id}`}>
          <Button colorScheme="yellow">watch now</Button>
        </Link>

        <Button
          variant={"ghost"}
          colorScheme="yellow"
          onClick={() => playListHandler(id)}
        >
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Page = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const {message,success,error,loading,courses} = useSelector((state:any)=>state.courses)

  const categories = [
    "web development",
    "Artifical intellegence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
  ];

  const playListHandler = async(courseId: any) => {
  await dispatch(addToPlayList(courseId));
  dispatch(loadUser())
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [category, dispatch, error, keyword, message]);

  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"10"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Heading m={"8"}>All Courses</Heading>

          <Input
            type="text"
            focusBorderColor="yellow.500"
            // style={{
            //   padding:'1.5vmax',
            //   width: '100%',
            //   marginLeft: 'auto',

            // }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search a word..."
          />
          <HStack
            minW={"100vw"}
            overflow={"auto"}
            paddingY={"10"}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {categories.map((item, index) => (
              <Button
                onClick={() => setCategory(item)}
                key={index}
                minW={["60", "30"]}
              >
                <Text>{item}</Text>
              </Button>
            ))}
          </HStack>
          <Stack
            direction={["column", "row"]}
            flexWrap={"wrap"}
            alignItems={["center", "flex-start"]}
            justifyContent={["flex-start", "space-evenly"]}
          >
            {courses.length > 0 ? (
              courses.map((item: any, index: any) => (
                <Course
                  key={item._id}
                  title={item.title}
                  views={item.views}
                  id={item._id}
                  description={item.description}
                  creator={item.createdBy}
                  imageSrc={item.poster.url}
                  lectureCount={item.numOfVideos}
                  playListHandler={playListHandler}
                />
              ))
            ) : (
              <Heading mt={4} textTransform={"uppercase"}>
                courses not found
              </Heading>
            )}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Page;
