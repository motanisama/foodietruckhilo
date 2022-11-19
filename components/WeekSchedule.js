import { Box, Heading, Text, Textarea } from "@chakra-ui/react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";

function WeekSchedule({ foodTruckData }) {
  console.log(foodTruckData);
  return (
    <Box
      w={"full"}
      direction="column"
      backgroundColor={"white"}
      rounded={"2xl"}
      boxShadow={"2xl"}
      width={"full"}
      overflow={"hidden"}
      mb={4}
      display={"flex"}
      flexDir={"column"}
    >
      <Heading>Weekly Schedule</Heading>
      <Text textColor={"gray.400"}>
        Last Updated:
        {foodTruckData ? format(parseISO(foodTruckData.updatedAt), "Pp") : null}
      </Text>
    </Box>
  );
}

export default WeekSchedule;
