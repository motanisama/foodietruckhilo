import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
  useMediaQuery,
  Stack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import BodyHero from "../components/BodyHero";
import SocialProfileSimple from "../components/Card";
import Cardrow from "../components/Cardrow";
import Carousel, { TruckCard } from "../components/Carousel";
import DashboardShell from "../components/DashboardShell";
import SmallCentered from "../components/Footer";
import { TruckGrid } from "../components/Grid";
import Hero, { Blob } from "../components/Hero";
import CallToActionWithVideo from "../components/Hero";
import Map from "../components/Map";
import CallToActionWithAnnotation from "../components/Sponsor";
import TruckModal from "../components/TruckModal";
import { CurrentMarkerContext, LocationContext } from "../lib/context";

export default function Home() {
  const { locations } = useContext(LocationContext);
  const { setCurrentMarker } = useContext(CurrentMarkerContext);

  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Box as="main" w={"full"} direction="column" h="full" alignItems={"center"}>
      <DashboardShell full={true}>
        <Hero />

        <BodyHero />
        <Stack
          flex={1}
          spacing={{ base: 5, md: 10 }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          width={"full"}
          maxWidth={"1600px"}
          marginBottom={"4rem"}
        >
          <Heading
            id="feature"
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Map
            </Text>
          </Heading>
          <Text maxW={"50%"} color={"gray.500"} fontSize={"xl"}>
            FoodieTrek beta currently promotes licensed and approved partnered
            food trucks on the Big Island of Hawai'i. We help break down the
            barriers of trying something new by providing daily updates to find
            local moving food trucks. Come try something new!
          </Text>
        </Stack>
        <Box
          position={"relative"}
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          overflow={"hidden"}
          id="map"
          maxW={"1600px"}
          border={"8px"}
          borderColor={"red.400"}
        >
          <Map
            mapContainerStyle={{
              width: "100%",
              height: "50vh",
            }}
            locations={locations}
            isMobile={isMobile}
          />
        </Box>

        <Heading
          marginTop={"8rem"}
          id="feature"
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          width={"full"}
          maxWidth={"1600px"}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "red.400",
              zIndex: -1,
            }}
          >
            Featured Food Trucks
          </Text>
        </Heading>
        <Carousel>
          {locations?.map((data, i) => (
            <TruckCard data={data} key={data.truckName + i} />
          ))}
        </Carousel>
      </DashboardShell>
      <SmallCentered />
    </Box>
  );
}
