import React from "react";
import { Flex, Link, Avatar, Box, Button } from "@chakra-ui/react";
import { HomeIcon } from "../styles/icons";
import NextLink from "next/link";
import LoginModal from "./LoginModal";
import { useAuth } from "../lib/auth";

const DashboardShell = ({ children, full }) => {
  const auth = useAuth();

  return (
    <Box backgroundColor="gray.100" h={full ? "full" : "275vh"}>
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link>
                <HomeIcon size="24px" mr={8} />
              </Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {auth.user ? null : <LoginModal>Login</LoginModal>}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        margin="0 auto"
        direction="column"
        maxW="1250px"
        px={[0, 8, 8]}
        alignItems={"center"}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
