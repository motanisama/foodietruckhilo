import React from "react";
import { Flex, Link, Avatar, Box, Button } from "@chakra-ui/react";
import { HomeIcon } from "../styles/icons";
import NextLink from "next/link";
import LoginModal from "./LoginModal";
import { useAuth } from "../lib/auth";

const DashboardShell = ({ children, full }) => {
  const auth = useAuth();

  return (
    <Box h={full ? "full" : "100vh"}>
      <Flex
        backgroundColor="gray.100"
        w="full"
        borderTop="5px solid #F56565
        "
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1600px"
          margin="0 auto"
          w="full"
          px={8}
          h="6vh"
        >
          <Flex align="center">
            {/* <NextLink href="/" passHref>
              <Link>
                <HomeIcon size="24px" mr={8} />
              </Link>
            </NextLink> */}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <LoginModal>Login</LoginModal>
            <NextLink href="/" passHref>
              <Link>
                <Button>Map</Button>
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link>
                <Button>About</Button>
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        margin="0 auto"
        direction="column"
        px={[0, 8, 8]}
        alignItems={"center"}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
