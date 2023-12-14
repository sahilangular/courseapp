"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Button,
  Box,
  Input,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { requestCourse } from "../redux/action/other";
import toast from "react-hot-toast";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();

  const { loading, message, error } = useSelector((state: any) => state.other);

  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(requestCourse(name, email, course));
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
    <Container
      h={"92vh"}
      my={4}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack w={["full", "30vw"]} style={{}}>
        <Heading my={2}>Request New Course</Heading>
        <form
          style={{ width: "100%", padding: "10px" }}
          onSubmit={submitHandler}
        >
          <Box my={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              required
              id="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name.."
              type="text"
              focusBorderColor="yellow"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email.."
              type="email"
              focusBorderColor="yellow"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="course">course</FormLabel>
            <Textarea
              required
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Explain your Course"
              focusBorderColor="yellow"
            />
          </Box>
          <Button type="submit" colorScheme="yellow" my={4} isLoading={loading}>
            Send Mail
          </Button>
          <Link
            href={"/courses"}
            style={{
              marginLeft: "10px",
            }}
          >
            <Button colorScheme="yellow" variant={"link"}>
              click
            </Button>
          </Link>{" "}
          here see available courses
        </form>
      </VStack>
    </Container>
  );
};

export default Page;
