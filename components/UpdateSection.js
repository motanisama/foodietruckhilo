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
  Divider,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { AtSignIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import Update from "./Updates";
import { useUpdateData } from "../lib/hooks";

function UpdateSection({ children, title, admin }) {
  const { updates } = useUpdateData("AMIJw0xhpasiTMcwD1D9");
  const updateContainer = useRef();
  return (
    <Box
      w={"full"}
      direction="column"
      backgroundColor={"white"}
      rounded={"2xl"}
      width={"full"}
      overflow={"hidden"}
      border={"2px"}
      borderColor={"gray.200"}
      boxShadow={"md"}
      mb={4}
    >
      <Flex justifyContent={"space-between"} p={4}>
        <Heading>{title}</Heading>
      </Flex>
      <Divider />
      <Box
        display={"flex"}
        flexDirection="column"
        width={"full"}
        ref={updateContainer}
        maxHeight={"80vh"}
        boxSizing={"border-box"}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {updates &&
          updates.map((data) => {
            return <Update data={data} admin={admin} key={data.id} />;
          })}
      </Box>
    </Box>
  );
}

export default UpdateSection;
