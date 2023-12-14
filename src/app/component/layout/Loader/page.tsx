import { HStack, Spinner } from "@chakra-ui/react";
import React from "react";

function Page() {
  return (
    <HStack w={"100%"} h={"100vh"} justifyContent={"center"}>
      <div style={{transform:'scale(4)'}}>
      <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="transparent"
        color="yellow.500"
        size={"xl"}
      />
      </div>
    </HStack>
  );
}

export default Page;
