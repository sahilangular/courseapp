"use client";
import React, { useEffect, useState } from "react";
import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { resetPassword } from "@/app/redux/action/profileAction";
import toast from "react-hot-toast";

const Page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params:any = useParams();

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state: any) => state.profile
  );

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmPassword,params.id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      router.push("/");
    }
  });

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
          reset password
        </Heading>
        <VStack spacing={18}>
          <Input
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password.."
            type="password"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Input
            required
            id="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter confirm password.."
            type="password"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Button type="submit" isLoading={loading} w={"full"} colorScheme="yellow">
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Page;
