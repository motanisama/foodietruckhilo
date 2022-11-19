import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useFoodtruckData } from "../lib/hooks";
import Map from "./Map";

function LocationDetail() {
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
    ></Box>
  );
}

export default LocationDetail;
