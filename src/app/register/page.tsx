"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Heading,
  FormLabel,
  Input,
  Box,
  Button,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import UploadWidget from "../cloudinary/uploadwidget";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { register } from "../redux/action/userAction";
import { useRouter } from "next/navigation";

export const fileUploadCss = {
  curesor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  // height: "120%",
  color: "#ECC94B",
  backgroundColor: "white",
  border: "none",
};

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarPreview, setavatarPreview] = useState<any | null>("");
  const [publicid, setPublicid] = useState<any | null>("");
  const [url, setUrl] = useState<any | null>();

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()

  // const avatarUploadHandler = (e: any) => {
  //   const file = e.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setavatarPreview(reader.result);
  //     setAvatar(file);
  //   };
  // };

  const handleOnUpload = (error: any, result: any, widget: any) => {
    if (error) {
      widget.close({
        quiet: true,
      });
    }
    console.log(result.info);
    setavatarPreview(result.info.secure_url);
    setPublicid(result.info.public_id);
    setUrl(result.info.secure_url);
  };

  const submitHandler = async(e: any) => {
    e.preventDefault();
   await dispatch(register(name, email, password, publicid, url));
   router.push('/profile')
  };

  return (
    <Container h={"120vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={16}>
        <Heading textTransform={"uppercase"}>registration</Heading>
        <form style={{ width: "100%" }} onSubmit={submitHandler}>
          <Box my={1} display={"flex"} justifyContent={"center"}>
            <Avatar src={avatarPreview} size={"2xl"} />
          </Box>
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
          <Box my={4}>
            <UploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e: any) {
                  e.preventDefault();
                  open();
                }
                return (
                  <Button css={fileUploadCss} onClick={handleOnClick}>
                    Upload Avatar
                  </Button>
                );
              }}
            </UploadWidget>
            {/* <FormLabel htmlFor="avatar">avatar</FormLabel> */}
            {/* <Input
              accept="image/*"
              required
              id="avatar"
              onChange={avatarUploadHandler}
              type="file"
              focusBorderColor="yellow"
              css={fileUploadStyle}
            /> */}
          </Box>
          <Button type="submit" colorScheme="yellow" my={4}>
            register
          </Button>
          <Box>
            Already signed up?{" "}
            <Link href={"/login"}>
              <Button colorScheme="yellow" variant={"link"}>
                login
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
