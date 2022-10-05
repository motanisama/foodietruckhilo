import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import SocialProfileSimple from "./Card";

function Cardrow() {
  return (
    <Flex direction={"row"}>
      <Box
        m={4}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
        overflow={"hidden"}
      >
        <SocialProfileSimple />
      </Box>
      <Box
        m={4}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
        overflow={"hidden"}
      >
        <SocialProfileSimple />
      </Box>
      <Box
        m={4}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
        overflow={"hidden"}
      >
        <SocialProfileSimple />
      </Box>
    </Flex>
  );
}

export default Cardrow;
