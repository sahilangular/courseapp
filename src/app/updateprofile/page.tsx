"use client";
import React, { useEffect, useState } from "react";
import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateProfile } from "../redux/action/profileAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loadUser } from "../redux/action/userAction";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, message, loading, error } = useSelector(
    (state: any) => state.profile
  );
  const router = useRouter();

  const submitHandler = async(e: any) => {
    e.preventDefault();
   await dispatch(updateProfile(name, email));
   dispatch(loadUser())
    setName("");
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({type:'clearError'})
    }

    if (message) {
      toast.success(message);
      dispatch({type:'clearMessage'})
      router.push("/profile");
    }
  }, [message, error, router,dispatch]);

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
          update profile
        </Heading>
        <VStack spacing={18}>
          <Input
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name.."
            type="text"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Input
            required
            id="password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter confirm password.."
            type="email"
            focusBorderColor="yellow"
            w={["full", "3xl"]}
            py={6}
            autoComplete="off"
          />

          <Button type="submit" isLoading={loading} w={"full"} colorScheme="yellow">
            Update Profile
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Page;
