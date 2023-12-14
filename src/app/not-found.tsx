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

export default function NotFound() {
  return (
    <Container h={"90vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={4}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading>Page Not Found</Heading>
        <Link href={"/"}>
          <Button colorScheme="yellow" variant={"ghost"}>
            Go To Home
          </Button>
        </Link>
      </VStack>
    </Container>
  );
}
