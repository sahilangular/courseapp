"use client";
import React, { useEffect, useState } from "react";
import CourseModel from "../courseModel";
import {
  Grid,
  Box,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  HStack,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { getAllCourses, getCourseLecture } from "@/app/redux/action/course";
import Loader from "../../component/layout/Loader/page";
import { addCourseLecture, deleteCourse, deleteLectureCourse } from "@/app/redux/action/admin";
import toast from "react-hot-toast";

const Page = () => {
  const [render, setRender] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch: AppDispatch = useDispatch();

  const [courseId, setCourseId] = useState('');

  const [title, setTitle] = useState('');

  const { loading, courses } = useSelector((state: any) => state.courses);
  const {
    loading: deleteLoading,
    message,
    error,
  } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getAllCourses());
    setRender(true);
  }, [dispatch]);

  const courseDetailsHandler = (courseId: any,title:string) => {
   dispatch(getCourseLecture(courseId));
    onOpen();
    setCourseId(courseId)
    setTitle(title);
  };

  const deletebuttonHandler = async(courseId: any) => {
    await dispatch(deleteCourse(courseId))
    dispatch(getAllCourses())

  };

  const deleteLectureHandler = async(courseId: any,lectureId:any) => {
    await dispatch(deleteLectureCourse(courseId,lectureId));
    dispatch(getCourseLecture(courseId))
    
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  },[dispatch, error, message]);

  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box p={[0, 8]} overflowX={"auto"}>
            <Heading
              textTransform={"uppercase"}
              my={16}
              textAlign={["center", "left"]}
            >
              All Courses
            </Heading>
            <TableContainer w={["100vw", "full"]}>
              <Table variant={"simple"} size={"lg"}>
                <TableCaption>
                  All available courses in the Database
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Poster</Th>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Creator</Th>
                    <Th isNumeric>Views</Th>
                    <Th isNumeric>Lecture</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courses?.map((item: any) => (
                    <Row
                      key={item._id}
                      item={item}
                      courseDetailsHandler={courseDetailsHandler}
                      deletebuttonHandler={deletebuttonHandler}
                      loading={deleteLoading}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
              <CourseModel
                isOpen={isOpen}
                id={courseId}
                courseTitle={title}
                onClose={onClose}
                deleteButtonHandler={deleteLectureHandler}
              />
          </Box>
        </>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Page;

function Row({ item, courseDetailsHandler, deletebuttonHandler,loading }: any) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} alt={item.title} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => courseDetailsHandler(item._id,item.title)}
            colorScheme="purple"
            variant={"outline"}
          >
            view lecture
          </Button>
          <Button onClick={() => deletebuttonHandler(item._id)} isLoading={loading}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
