import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import SocialProfileSimple from "../../components/Card";
import DashboardShell from "../../components/DashboardShell";
import ProfileBody from "../../components/ProfileBody";
import UpdateSection from "../../components/UpdateSection";

function index() {
  return (
    <DashboardShell full={true}>
      <Flex direction="row">
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
        <ProfileBody />
      </Box>

      <UpdateSection />
    </DashboardShell>
  );
}

export default index;
