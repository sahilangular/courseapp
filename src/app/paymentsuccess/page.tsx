/* eslint-disable react/no-unescaped-entities */
'use client'
import React from "react";
import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import {RiCheckboxCircleFill} from 'react-icons/ri'
import Link from "next/link";
import { useSearchParams } from "next/navigation";


const Page = () => {
  const params = useSearchParams().get('reference');
  return (
    <Container h={"90vh"} p={16}>
      <Heading my={8} textAlign={"center"}>
        welcome
      </Heading>
      <VStack
        boxShadow={"lg"}
        alignItems={"center"}
        borderRadius={"lg"}
        spacing={0}
        h={'50vh'}
      >
        <Box
          bgColor={"yellow.400"}
          p={4}
          css={{ borderRadius: "8px 8px 0 0 " }}
        >
          <Text>Payment Success</Text>
        </Box>
        <Box p={4}>
          <VStack textAlign={"center"} px={8} mt={4} spacing={8}>
            <Text>
              Congratulation you're a pro member. You have access to premium
              content.{" "}
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link href={'/profile'}>
          <Button colorScheme="yellow" variant={'ghost'}>Go To Profile</Button>
        </Link>
        <Heading size={'xs'}> Reference No:{params}</Heading>
      </VStack>
    </Container>
  );
};

export default Page;
