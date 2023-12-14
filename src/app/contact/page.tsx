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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { contact } from "../redux/action/other";
import toast from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const {
    loading,
    message: contactMessage,
    error,
  } = useSelector((state: any) => state.other);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(contact(name, email, message));
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (contactMessage) {
      toast.success(contactMessage);
      dispatch({ type: "clearMessage" });
    }
  });

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
        <Heading my={2}>Contact Us</Heading>
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
            <FormLabel htmlFor="message">message</FormLabel>
            <Textarea
              required
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message.."
              focusBorderColor="yellow"
            />
          </Box>

          <Button type="submit" colorScheme="yellow" my={4} isLoading={loading}>
            Submit
          </Button>
        </form>
      </VStack>
    </Container>
  );
};

export default Page;
