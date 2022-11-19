import {
  Text,
  Box,
  Heading,
  IconButton,
  Flex,
  Avatar,
  Spacer,
  Button,
  Badge,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AtSignIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import {
  MdRestaurantMenu,
  MdSettingsInputAntenna,
  MdUpdate,
} from "react-icons/md";
import { format } from "date-fns";
import { async } from "@firebase/util";
import { convertTime } from "../helper/formatDate";

function ProfileBody({ foodTruckData, scheduleData }) {
  function isOpen(currentHH, currentmm, open, closed) {
    const openHH = open && open.split(":")[0];
    const openmm = open && open.split(":")[1];
    const closedHH = closed && closed.split(":")[0];
    const closedmm = closed && closed.split(":")[1];

    //check hours
    if (currentHH >= openHH && currentHH <= closedHH) {
      if (currentmm >= openmm && currentHH >= openHH) {
        return true;
      }

      if (currentmm < closedmm && currentHH <= closedHH) {
        return true;
      }
    }

    return false;
  }

  function currentDay() {
    //get Today's day
    const todayDate = new Date();
    const formattedToday = format(todayDate, "eeee");
    const formattedTime = format(todayDate, "HH:mm");
    const formattedHours = format(todayDate, "HH");
    const formattedMinutes = format(todayDate, "mm");

    const todaysTimes = scheduleData && scheduleData[formattedToday];
    const dbScheduleOpen = scheduleData && scheduleData[formattedToday].open;
    const dbScheduleClosed =
      scheduleData && scheduleData[formattedToday].closed;
    const storeopen = isOpen(
      formattedHours,
      formattedMinutes,
      dbScheduleOpen,
      dbScheduleClosed
    );

    return { ...todaysTimes, day: formattedToday, storeopen: storeopen };
  }

  return (
    <Box m={4}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        mb={2}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Avatar
          size={"2xl"}
          src={foodTruckData && foodTruckData.profileURL}
          alt={"Avatar Alt"}
          mb={4}
          mr={4}
          pos={"relative"}
          border={"2px solid white"}
        />

        <Box
          display={"flex"}
          w={"full"}
          flexDirection={"column"}
          justifyContent={"end"}
          flex={3}
        >
          <Flex direction={"column"}>
            <Box w={"full"}>
              <Heading m={2} justifySelf={"center"}>
                {foodTruckData && foodTruckData.truckName}
              </Heading>
              <Heading size={"md"} m={2} justifySelf={"center"}>
                {foodTruckData &&
                  `${currentDay().day} ${convertTime(
                    currentDay().open
                  )} - ${convertTime(currentDay().closed)} `}
                {currentDay().storeopen ? (
                  <Badge ml="1" colorScheme="green">
                    OPEN
                  </Badge>
                ) : (
                  <Badge ml="1" colorScheme="red">
                    CLOSED
                  </Badge>
                )}
              </Heading>
            </Box>
          </Flex>
        </Box>
        <Flex align={"end"} alignSelf={"end"} justifySelf={"flex-end"} flex={2}>
          <Spacer />
          <Button
            maxW={"8em"}
            as={"a"}
            href={foodTruckData ? foodTruckData.menuUrl : null}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"red.400"}
            color={"white"}
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
            leftIcon={<MdRestaurantMenu size={"2em"} />}
            m={2}
          >
            Menu
          </Button>

          <IconButton
            as={"a"}
            href="https://www.facebook.com/Peace.Poles/"
            backgroundColor={"red.400"}
            color={"gray.100"}
            aria-label="Call Segun"
            size="lg"
            icon={<AtSignIcon />}
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
            margin={2}
          />

          <IconButton
            as={"a"}
            href="https://rotaryd5000.org/"
            backgroundColor={"red.400"}
            color={"gray.100"}
            aria-label="Call Segun"
            size="lg"
            icon={<ExternalLinkIcon />}
            margin={2}
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
          />
        </Flex>
      </Box>

      <Divider color={"gray.400"} />
    </Box>
  );
}

export default ProfileBody;
