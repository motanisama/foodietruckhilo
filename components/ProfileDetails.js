import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import LocationDetail from "./LocationDetail";
import WhiteCard from "./Shared/WhiteCard";
import WeekSchedule from "./WeekSchedule";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import { convertTime } from "../helper/formatDate";

function ProfileDetails({ foodTruckData, scheduleData }) {
  function sortSchedule(schedule) {
    if (schedule) {
      let sortable = [];
      for (var day in schedule) {
        if (day != "updatedAt") {
          sortable.push([day, schedule[day]]);
        }
      }
      const newArray = sortable.sort(function (a, b) {
        return a[1].sort - b[1].sort;
      });

      return newArray;
    }
  }

  return (
    <Flex flex={2} direction={"column"} justifyContent={"space-between"} mb={8}>
      <Box
        w={"full"}
        direction="column"
        backgroundColor={"white"}
        width={"full"}
        overflow={"hidden"}
        mb={4}
        border={"2px"}
        borderColor={"gray.200"}
        boxShadow={"md"}
        borderRadius={"xl"}
      >
        <Heading m={2}>Info</Heading>
        <Divider />
        <Text m={2} as="div" whiteSpace={"pre-line"} fontSize="xl">
          {foodTruckData && foodTruckData.description}
        </Text>
      </Box>

      <Box
        w={"full"}
        direction="column"
        overflow={"hidden"}
        mb={4}
        border={"2px"}
        borderColor={"gray.200"}
        boxShadow={"md"}
        borderRadius={"xl"}
      >
        <Heading m={2}>Weekly Schedule</Heading>
        <Divider />
        {scheduleData &&
          sortSchedule(scheduleData).map((data) => {
            return (
              <Box key={data[0]}>
                <Heading ml={2} size={"md"}>
                  {data != "updatedAt" ? data[0] : null}
                </Heading>
                <Heading ml={2} mb={2} size={"md"}>
                  {data != "updatedAt"
                    ? `${convertTime(data[1].open)} - ${convertTime(
                        data[1].closed
                      )}`
                    : null}
                </Heading>
              </Box>
            );
          })}
        <Text m={2} textColor={"gray.400"}>
          Last Updated:
          {foodTruckData
            ? format(parseISO(foodTruckData.updatedAt), "Pp")
            : null}
        </Text>
      </Box>

      <Box
        w={"full"}
        direction="column"
        backgroundColor={"white"}
        width={"full"}
        mb={4}
        boxShadow={"md"}
        border={"2px"}
        borderColor={"gray.200"}
        borderRadius={"xl"}
      >
        <Heading m={2}>Contact</Heading>
        <Divider />
        <Text m={2} fontSize="xl">
          {foodTruckData && foodTruckData.author}
        </Text>
      </Box>
    </Flex>
  );
}

export default ProfileDetails;
