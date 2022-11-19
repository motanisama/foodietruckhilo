import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import AdminCard from "../../components/AdminCard";
import SocialProfileSimple from "../../components/Card";
import DashboardShell from "../../components/DashboardShell";
import ProfileBody from "../../components/ProfileBody";
import ProfileDetails from "../../components/ProfileDetails";
import Update from "../../components/Updates";
import UpdateSection from "../../components/UpdateSection";
import {
  useFoodtruckData,
  useSingleFoodTruck,
  useSingleSchedule,
  useUpdateData,
} from "../../lib/hooks";

function index() {
  const { foodTruckData } = useSingleFoodTruck("AMIJw0xhpasiTMcwD1D9");
  const { scheduleData } = useSingleSchedule("wUgRua9uhFhSlw1Vtxgb");

  return (
    <DashboardShell>
      <Box
        as="div"
        width={"full"}
        mb={4}
        w={"full"}
        flexDirection="column"
        rounded={"2xl"}
        boxShadow={"2xl"}
        overflow={"hidden"}
        display={"flex"}
        maxW={"1600px"}
      >
        <Box
          w={"100%"}
          h={"50%"}
          backgroundImage={"/1.jpg"}
          backgroundPosition={"center"}
        ></Box>
        <Box
          flex={1}
          w={"full"}
          direction="column"
          backgroundColor={"white"}
          width={"full"}
          h={"100%"}
          overflow={"hidden"}
        >
          <ProfileBody
            foodTruckData={foodTruckData}
            scheduleData={scheduleData}
          />
        </Box>
      </Box>
      <Flex flexDir={"row"} w={"full"} maxW={"1600px"}>
        <Box flex={1} mr={4}>
          <ProfileDetails
            foodTruckData={foodTruckData}
            scheduleData={scheduleData}
          />
        </Box>

        <Box flex={2} h={"100vh"}>
          <UpdateSection title={`Today's update's`}></UpdateSection>
        </Box>
      </Flex>
    </DashboardShell>
  );
}

export default index;
