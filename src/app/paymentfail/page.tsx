import React from "react";
import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";

const page = () => {
  return (
    <Container h={"90vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={4}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading>Payment Fail</Heading>
        <Link href={"/subscribe"}>
          <Button colorScheme="yellow" variant={"ghost"}>
            Try again
          </Button>
        </Link>
      </VStack>
    </Container>
  );
}

export default page