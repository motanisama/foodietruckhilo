import { Box } from "@chakra-ui/react";
import React from "react";

export default function WhiteCard(props) {
  return (
    <Box
      w={"full"}
      direction="column"
      backgroundColor={"white"}
      rounded={"2xl"}
      boxShadow={"2xl"}
      width={"full"}
      overflow={"hidden"}
      mb={4}
    >
      {props.children}
    </Box>
  );
}
