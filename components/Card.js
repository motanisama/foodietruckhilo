import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CurrentMarkerContext } from "../lib/context";

export default function SocialProfileSimple({ data }) {
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
    <Center>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        border={handleCurrent(data?.truckName) ? "2px" : null}
      >
        <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          }
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          // _after={{
          //   content: '""',
          //   w: 4,
          //   h: 4,
          //   bg: "green.300",
          //   border: "2px solid white",
          //   rounded: "full",
          //   pos: "absolute",
          //   bottom: 0,
          //   right: 3,
          // }}
          id={data?.truckName}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {data?.truckName}
        </Heading>
        <Text size={"sm"} color="gray.400">
          Last Update: 10:00 8/1/22
        </Text>
        <Text size={"sm"} color="gray.400"></Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        ></Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #music
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
            onClick={handleMap}
          >
            Map
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"red.400"}
            color={"white"}
            _hover={{
              bg: "red.500",
              boxShadow:
                "0px 1px 25px -5px rgb(245 101 101 / 48%), 0 10px 10px -5px rgb(245 101 101 / 43%)",
            }}
            _focus={{
              bg: "red.500",
            }}
            onClick={handleInfo}
          >
            Info
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
