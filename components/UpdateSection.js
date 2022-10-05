import {
  Box,
  Text,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { AtSignIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import Update from "./Updates";

function UpdateSection() {
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
      <Flex justifyContent={"space-between"} m={8}>
        <Heading>Updates</Heading>
      </Flex>
      <Box display={"flex"} flexDirection="column" width={"full"}>
        <Update />
        <Update />
        <Update />
      </Box>
    </Box>
  );
}

export default UpdateSection;
