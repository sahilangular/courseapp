"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Heading,
  VStack,
  Input,
  Textarea,
  Select,
  Image,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import UploadWidget from "../../cloudinary/uploadwidget";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { createCourse } from "@/app/redux/action/admin";
import toast from "react-hot-toast";
import fileUploadCss from "@/app/fileupload";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [imagePrev, setImagePrev] = useState<any | null>("");
  const [public_id, setPublic_id] = useState<any | null>("");

  const dispatch: AppDispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state: any) => state.admin
  );

  const categories = [
    "web development",
    "Artifical intellegence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
  ];

  const handleOnUpload = (error: any, result: any, widget: any) => {
    if (error) {
      widget.close({
        quiet: true,
      });
    }
    setPublic_id(result.info.public_id)
    setImagePrev(result.info.secure_url);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      createCourse(title, description, category, createdBy,public_id,imagePrev)
    );
    setTitle('');
    setDescription('')
    setCategory('');
    setCreatedBy('');
    setImagePrev('');
  };

  // const avatarUploadHandler = (e: any) => {
  //   const file = e.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImagePrev(reader.result);
  //     setImage(file);
  //   };
  // };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <Grid minH={"95vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Container py={16}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={"uppercase"}
            my={16}
            textAlign={["center", "left"]}
          >
            Create Course
          </Heading>
          <VStack m={"auto"} spacing={8}>
            <Input
              required
              id="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter name.."
              type="text"
              focusBorderColor="purple.300"
              autoComplete="off"
            />
            <Textarea
              required
              id="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description.."
              focusBorderColor="purple.300"
            />
            <Input
              required
              id="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Creator name.."
              type="text"
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}> Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <UploadWidget onUpload={handleOnUpload}>
              {({ open }:any) => {
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
              accept="image/*"
              required
              onChange={avatarUploadHandler}
              type="file"
              focusBorderColor="purple.300"
              css={{
                "&::file-selector-button": {
                  ...fileUploadCss,
                  color: "purple.300",
                },
              }}
            /> */}
            {imagePrev && (
              <Image
                src={imagePrev}
                alt={"course image"}
                boxSize={64}
                objectFit={"contain"}
              />
            )}

            <Button
              type="submit"
              w={"full"}
              colorScheme="purple"
              isLoading={loading}
            >
              Create Course
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default Page;
