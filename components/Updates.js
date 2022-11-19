import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { MdDelete } from "react-icons/md";
import { deleteUpdate } from "../lib/db";

function Update({ data, admin }) {
  const toast = useToast();

  const handleDelete = async () => {
    await deleteUpdate(data.id);
    toast({
      title: "Success!",
      description: "Updated Food Truck Location",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Box border={"2px"} borderRadius={"4px"} m={2} borderColor={"gray.100"}>
      <Flex dir="row" justifyContent={"space-between"}>
        <Heading m={2}>@Title</Heading>
        {admin ? (
          <IconButton
            onClick={handleDelete}
            variant="outline"
            icon={<MdDelete />}
            size={"sm"}
            m={2}
          />
        ) : null}
      </Flex>

      <Heading size={"small"} m={2} className="commentBody">
        {data && data.type}
      </Heading>
      <Flex dir="row" justifyContent={"space-between"} m={2}>
        <Text maxW={"50vw"} noOfLines={4} fontSize={"xl"}>
          {data && data.body}
        </Text>
      </Flex>
      <Flex p={2} dir="row" justifyContent={"flex-end"}>
        <Text color={"gray.400"}>
          {data && format(parseISO(data.createdAt), "Pp")}
        </Text>
      </Flex>
    </Box>
  );
}

export default Update;
