import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Children, useContext } from "react";
import { CurrentMarkerContext } from "../lib/context";
import SocialProfileSimple from "./Card";
import TruckModal from "./TruckModal";

export function Carousel({ children }) {
  let cards = [1, 2, 3, 4, 5, 6];
  return (
    <Box
      display={"flex"}
      padding={"3rem"}
      overflowX={"scroll"}
      alignItems={"center"}
      justifyContent={"center"}
      direction={{ base: "row", sm: "column" }}
    >
      {children}
    </Box>
  );
}

export function TruckCard({ data, key }) {
  console.log(data);
  const { currentMarker, setCurrentMarker } = useContext(CurrentMarkerContext);
  const router = useRouter();
  const handleMap = () => {
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
    setCurrentMarker(data);
  };

  const handleCurrent = (id) => {
    if (id === currentMarker?.truckName) {
      return true;
    } else {
      return false;
    }
  };

  const handleInfo = () => {
    router.push(`/foodtruck/${data?.id}`);
  };
  return (
    <Box
      color={"white"}
      display={"flex"}
      position={"relative"}
      flexDirection={"column"}
      height={"350px"}
      width={"400px"}
      minW={"400px"}
      padding={"1.5rem"}
      borderRadius={"16px"}
      background={"red.400"}
      css={{
        "&:hover": { transform: "translateY(-3rem);" },
        "&:hover~&": { transform: "translatex(130px)" },
        "&:not(:first-of-type)": { marginLeft: "-130px" },
      }}
      transition={"0.2s"}
      rounded={"2xl"}
      boxShadow={"xl"}
      key={key}
    >
      <Heading marginBottom={"4"}>
        {data &&
          data.tag.map((i) => {
            if (i === "") {
              return;
            }
            return <Text>{`#${i}`}</Text>;
          })}
      </Heading>
      <Flex alignItems={"center"}>
        <Avatar size={"lg"} mr={4} id={data?.truckName} src={"avatar.png"} />
        <Heading size={"lg"}>{`${data?.truckName}`}</Heading>
      </Flex>
      <Stack mt={8} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.200",
          }}
          bg={"red.400"}
          color={"white"}
          onClick={handleMap}
        >
          Map
        </Button>
        <TruckModal id={data.id} scheduleId={data.scheduleId}>
          Info
        </TruckModal>
      </Stack>
    </Box>
  );
}

export default Carousel;
