"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { login } from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { loading, isAuthenticated, user, error, message } = useSelector(
    (state: any) => state.user
  );

  const submitHandler = (e:any) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      router.push("/home", { scroll: false });
    }
  }, [dispatch, error, message,router]);

  return (
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={16}>
        <Heading>WELCOME TO COURSE BUNDLER</Heading>
        <form style={{ width: "100%" }} onSubmit={submitHandler}>
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
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password.."
              type="password"
              focusBorderColor="yellow"
            />
          </Box>
          <Box>
            <Link href={"/forgetpassword"}>
              <Button fontSize={"sm"} colorScheme="yellow" variant={"link"}>
                Forget Password
              </Button>
            </Link>
          </Box>
          <Button type="submit" colorScheme="yellow" my={4}>
            Login
          </Button>
          <Box>
            New User?{" "}
            <Link href={"/register"}>
              <Button colorScheme="yellow" variant={"link"}>
                signUp
              </Button>
            </Link>{" "}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Page;
