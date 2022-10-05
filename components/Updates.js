import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

function Update({ data }) {
  return (
    <Box border={"2px"} borderRadius={"4px"} m={2} borderColor={"gray.100"}>
      <Heading m={2}>@Title</Heading>
      <Text m={2} className="commentBody">
        commetns
      </Text>
      <Box
        m={2}
        direction="column"
        justify={"center"}
        align={"end"}
        color={"gray.400"}
      >
        10/10/10
        {/* {format(parseISO(data.createdAt), "PPpp")} */}
      </Box>
    </Box>
  );
}

export default Update;
