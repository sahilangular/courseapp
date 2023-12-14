import React from "react";
import { Box, Stack, VStack, Heading, HStack } from "@chakra-ui/react";
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from "react-icons/ti";
import { DiGithub } from "react-icons/di";

const page = () => {
  return (
    <Box padding={"4"} bg={"black"} minH={"10vh"} >
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} width={"full"}>
          <Heading color={"white"}>ALL RIGHT RESERVED</Heading>
          <Heading fontFamily={"body"} size={"sm"} color={"yellow"}>
            Sahil Dalvi
          </Heading>
        </VStack>
        <HStack spacing={["2", "10"]} justifyContent={"center"}
        color={'white'}
        fontSize={50}>
          <a href="https://www.youtube.com/" target="_blank">
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <TiSocialInstagramCircular />
          </a>
          <a href="https://www.github.com/" target="_blank">
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default page;
