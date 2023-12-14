"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Grid,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import UploadWidget from "../cloudinary/uploadwidget";
import { addCourseLecture } from "../redux/action/admin";
import { AppDispatch } from "../redux/store";
import { getCourseLecture } from "../redux/action/course";
import toast from "react-hot-toast";
import fileUploadCss from "../fileupload";

const CourseModel = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  courseTitle,
}: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [VideoPrev, setVideoPrev] = useState<any | null>("");
  const [public_id, setPublic_id] = useState<any | null>("");

  const dispatch: AppDispatch = useDispatch();

  const { lectures, loading } = useSelector((state: any) => state.courses);

  const {
    message,
    loading: addLectureLoading,
    error,
  } = useSelector((state: any) => state.admin);

  const {
    message:deleteMessage,
    loading: deleteLectureLoading,
    erro:deleteError,
  } = useSelector((state: any) => state.admin);

  // const changeVideoHandler = (e: any) => {
  //   const file = e.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setVideoPrev(reader.result);
  //     setVideo(file);
  //   };
  // };

  const handleOnUpload = (error: any, result: any, widget: any) => {
    if (error) {
      widget.close({
        quiet: true,
      });
    }
    console.log(result.info);
    setPublic_id(result.info.public_id);
    setVideoPrev(result.info.secure_url);
  };

  const addLectureButtonHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(
      addCourseLecture(id, title, description, public_id, VideoPrev)
    );
    dispatch(getCourseLecture(id));
  };

  const onCloseHandler = () => {
    onClose();
    setTitle("");
    setDescription("");
    setVideoPrev(null);
  };

  useEffect(()=>{
    if(error){
      toast.error(error.message);
      dispatch({type:'clearError'});
    }

    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'});
    }
  },[dispatch, error, message])

  return (
    <Modal
      isOpen={isOpen}
      size={"full"}
      onClose={onClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody p={16}>
          <Grid templateColumns={["1fr", "3fr 1fr"]}>
            <Box px={[0, 16]}>
              <Box my={5}>
                <Heading>{courseTitle}</Heading>
                <Heading size={"sm"} opacity={0.4}>
                  #{id}
                </Heading>
              </Box>
              <Heading size={"lg"}>Lectures</Heading>
              {lectures.map((item: any, index: any) => (
                <VideoCard
                  key={item._id}
                  title={item.title}
                  num={index + 1}
                  description={item.description}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Box>
            <Box>
              <form onSubmit={addLectureButtonHandler}>
                <VStack spacing={4}>
                  <Heading textTransform={"uppercase"}>Add Lecture</Heading>
                  <Input
                    required
                    id="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title.."
                    type="text"
                    focusBorderColor="yellow"
                  />
                  <Textarea
                    required
                    id="email"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description.."
                    focusBorderColor="yellow"
                  />
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }) => {
                      function handleOnClick(e: any) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <Button css={fileUploadCss} onClick={handleOnClick}>
                          Upload Image
                        </Button>
                      );
                    }}
                  </UploadWidget>
                  {/* <Input
                    accept="video/mp4"
                    required
                    id="video"
                    type="file"
                    onChange={changeVideoHandler}
                    focusBorderColor="yellow"
                    css={{
                      "&::file-selector-button": {
                        ...fileUploadCss,
                        color: "purple",
                      },
                    }}
                  /> */}
                  <Button type="submit" colorScheme="purple" width={"full"} isLoading={addLectureLoading}>
                    Add Lecture
                  </Button>
                  {VideoPrev && <ReactPlayer controls url={VideoPrev} />}
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCloseHandler}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModel;

function VideoCard({
  title,
  num,
  description,
  lectureId,
  courseId,
  deleteButtonHandler,
}: {
  title: string;
  num: number;
  description: String;
  lectureId: any;
  courseId: Number;
  deleteButtonHandler: any;
}) {
  return (
    <Stack
      direction={["column", "row"]}
      my={8}
      borderRadius={"lg"}
      boxShadow={"0 0 10px rgba(107,70,193,0.7)"}
      justifyContent={["flex-start", "space-between"]}
      p={8}
    >
      <Box>
        <Heading size={"sm"}>{`#${num} ${title}`}</Heading>
        <Text>{description}</Text>
      </Box>
      <Button
        color={"purple.600"}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
