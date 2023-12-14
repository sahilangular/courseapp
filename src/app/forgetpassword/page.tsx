"use client";
import React, { useState, useEffect } from "react";
import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { forgetPassword } from "../redux/action/profileAction";
import toast from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { message, loading, error } = useSelector(
    (state: any) => state.profile
  );

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
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
  }, [dispatch, error, message]);

  return (
    <Container
      py={16}
      h={"95vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form onSubmit={submitHandler}>
        <Heading
          marginBottom={6}
          textAlign={["center", "center"]}
          textTransform={"uppercase"}
        >
          forget password
        </Heading>
        <VStack spacing={18}>
          <Input
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email.."
            type="email"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Button type="submit" isLoading={loading} w={"full"} colorScheme="yellow">
            Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Page;
