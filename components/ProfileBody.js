import { Text, Box, Heading, IconButton, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { AtSignIcon, ExternalLinkIcon } from "@chakra-ui/icons";

function ProfileBody() {
  return (
    <Box m={8}>
      <Heading m={2}>Title</Heading>
      <Heading m={2}>Info</Heading>
      <Text m={2} as="div" whiteSpace={"pre-line"} fontSize="xl">
        text description
      </Text>

      <Flex direction={"row"} justifyContent={"space-between"} mb={8}>
        <Box>
          <Heading m={2}>Weekly Schedule</Heading>
          <Text m={2} fontSize="xl">
            importance text
          </Text>
        </Box>
        <Box>
          <Heading m={2}>Address</Heading>
          <Text m={2} fontSize="xl">
            Address text
          </Text>
        </Box>
        <Box>
          <Heading m={2}>Contact</Heading>
          <Text m={2} fontSize="xl">
            contact text
          </Text>
        </Box>
      </Flex>

      <Box direction="column" justify={"center"} align={"end"}>
        <IconButton
          as={"a"}
          href="https://www.facebook.com/Peace.Poles/"
          colorScheme="teal"
          aria-label="Call Segun"
          size="lg"
          icon={<AtSignIcon />}
          margin={2}
        ></IconButton>
        <IconButton
          as={"a"}
          href="https://rotaryd5000.org/"
          colorScheme="teal"
          aria-label="Call Segun"
          size="lg"
          icon={<ExternalLinkIcon />}
          margin={2}
        />
      </Box>
    </Box>
  );
}

export default ProfileBody;
