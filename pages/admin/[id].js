import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AdminCard from "../../components/AdminCard";
import SocialProfileSimple from "../../components/Card";
import DashboardShell from "../../components/DashboardShell";
import HookForm from "../../components/Form";
import Map from "../../components/Map";
import UpdateForm from "../../components/UpdateForm";
import { useAuth } from "../../lib/auth";
import { getTruck, getTrucks, getUser, getUsers } from "../../lib/db";
import {
  useFoodtruckData,
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
  const auth = useAuth();
  const { updates } = useUpdateData(props.user.truckId);
  const { foodTruckData } = useFoodtruckData(props.user.uid);

  return (
    <DashboardShell>
      <Flex w={"100vw"} align={"center"} justify={"center"}>
        <Box
          m={4}
          maxW={"32rem"}
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          overflow={"hidden"}
          alignSelf={"end"}
        >
          <AdminCard
            user={props.user}
            updates={updates}
            foodTruckData={foodTruckData}
          />
        </Box>

        <Box
          m={4}
          maxW={"32rem"}
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          overflow={"hidden"}
          justifySelf="center"
          alignSelf={"center"}
          h={"50vh"}
        >
          <Map admin locations={foodTruckData} />
        </Box>
      </Flex>

      <Box
        m={4}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
        overflow={"hidden"}
        backgroundColor={"white"}
      >
        <UpdateForm user={props.user} foodTruckData={foodTruckData} />
      </Box>
      <Box
        m={4}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
        overflow={"hidden"}
        backgroundColor={"white"}
      >
        <HookForm user={props.user} foodTruckData={foodTruckData} />
      </Box>

      <Button onClick={auth.signout}>Signout</Button>
    </DashboardShell>
  );
}

export default index;
