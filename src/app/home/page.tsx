"use client";

import React from "react";
import {
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import "./home.css";
import Link from "next/link";
import vg from "../assets/images/images.jpeg";
import Image from "next/image";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";
import ReactPlayer from "react-player";
import Head from "next/head";

const page = () => {

  return (
    <>
    <section className="home">
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height={"100%"}
          justifyContent={["center", "space-between"]}
          alignItems={"center"}
          spacing={["16", "56"]}
        >
          <VStack width={"full"} alignItems={["center", "flex-end"]}>
            <Heading size={"2xl"}>LEARN FROM THE EXPERTS </Heading>
            <Text>Find Valueable content at reasonable price</Text>
            <Link href={"/courses"}>
              <Button size={"lg"} colorScheme="yellow">
                Explore
              </Button>
            </Link>
          </VStack>
          <Image className="vector" width={500} height={500} src={vg} alt="homeImg" />
        </Stack>
      </div>
      <Box padding={'8'} bgColor='blackAlpha.800'>
        <Heading textAlign={"center"} fontFamily={"body"} color={"yellow.400"}>
          OURS BRANDS
        </Heading>
        <HStack className="brandBanner" justifyContent={'space-evenly'} marginTop={'3'}
        color={'white'}
        paddingTop={'5'}>
          <CgGoogle />
          <CgYoutube />

          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=Pf03RTjeISE"}
          width="100%"
          height={'80vh'}
          controls
        />
      </div>
    </section>
    
    </>
  );
};

export default page;
