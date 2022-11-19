import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  useBreakpoint,
  useMediaQuery,
  Text,
  Skeleton,
  Input,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import AdminCard from "../../components/AdminCard";
import AdminControl from "../../components/AdminControl";
import { Blob } from "../../components/BodyHero";
import SocialProfileSimple from "../../components/Card";
import DashboardShell from "../../components/DashboardShell";
import EditableForm from "../../components/EditableForm";
import HookForm from "../../components/Form";
import Map from "../../components/Map";
import ProfileBody from "../../components/ProfileBody";
import ProfileUpload from "../../components/ProfileUpload";
import WhiteCard from "../../components/Shared/WhiteCard";
import UpdateForm from "../../components/UpdateForm";
import UpdateSection from "../../components/UpdateSection";
import { useAuth } from "../../lib/auth";
import { getTruck, getTrucks, getUser, getUsers } from "../../lib/db";
import {
  useFoodtruckData,
  useSingleSchedule,
  useUpdateData,
  useUserLocation,
} from "../../lib/hooks";

export async function getStaticProps(context) {
  const userId = context.params.id;
  //   const { user } = await getUser(userId);
  const { user } = await getUser(userId);

  return {
    props: {
      user,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { users } = await getUsers();

  const paths = users.map((user) => ({
    params: {
      id: user.id.toString(),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

function index(props) {
  const breakpoint = useBreakpoint();
  const auth = useAuth();
  const { foodTruckData } = useFoodtruckData(props.user.uid);
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const { scheduleData } = useSingleSchedule(props.user.scheduleId);

  return (
    <DashboardShell full={true}>
      <Stack maxW={"1600px"} mb={4} justify={"center"} w={"full"}>
        <Heading>Welcome Back, 👋</Heading>
      </Stack>

      <Flex maxW={"1600px"} w={"full"} mb={4}>
        <Box
          rounded={"2xl"}
          width={"full"}
          overflow={"hidden"}
          boxShadow={"md"}
          border={"2px"}
          borderColor={"gray.200"}
        >
          <Map
            mapContainerStyle={{
              width: "100%",
              height: "50vh",
            }}
            locations={foodTruckData}
          />
        </Box>
      </Flex>

      <Flex
        maxW={"1600px"}
        w={"full"}
        flexDirection={{ base: "column", md: "row", sm: "row" }}
        spacing={{ base: 8, md: 10 }}
      >
        <Box
          rounded={"2xl"}
          border={"2px"}
          borderColor={"gray.200"}
          width={"full"}
          overflow={"hidden"}
          backgroundColor={"white"}
          boxShadow={"md"}
          m={2}
          flex={1}
        >
          <AdminControl
            isMobile={isMobile}
            user={props.user}
            foodTruckData={foodTruckData}
          />
          <Divider marginTop={2} />

          <UpdateForm user={props.user} foodTruckData={foodTruckData} />
          <ProfileUpload foodTruckData={foodTruckData} />
        </Box>
        <Box
          rounded={"2xl"}
          width={"full"}
          border={"2px"}
          borderColor={"gray.200"}
          overflow={"hidden"}
          boxShadow={"md"}
          backgroundColor={"white"}
          m={2}
          flex={1}
        >
          <HookForm
            user={props.user}
            foodTruckData={foodTruckData}
            schedule={scheduleData}
          />
        </Box>
      </Flex>

      <Button m={4} bg={"red.400"} color={"white"} onClick={auth.signout}>
        Signout
      </Button>
    </DashboardShell>
  );
}

export default index;
