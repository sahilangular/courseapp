"use client";
import React, { useState, useEffect } from "react";
import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { changePassword } from "../redux/action/profileAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { loading, message, isAuthenticated, error } = useSelector(
    (state: any) => state.profile
  );

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
    setOldPassword('');
    setNewPassword('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({type:"clearError"})
    }

    if (message) {
      toast.success(message);
      dispatch({type:"clearMessage"})
      router.push('/profile',{scroll:false})
    }
  }, [error,message,dispatch,router]);

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
          update password
        </Heading>
        <VStack spacing={18}>
          <Input
            required
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter password.."
            type="password"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Input
            required
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password.."
            type="password"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Button
            type="submit"
            isLoading={loading}
            w={"full"}
            colorScheme="yellow"
          >
            Update Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Page;
