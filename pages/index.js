import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import SocialProfileSimple from "../components/Card";
import Cardrow from "../components/Cardrow";
import DashboardShell from "../components/DashboardShell";
import SmallCentered from "../components/Footer";
import { TruckGrid } from "../components/Grid";
import CallToActionWithVideo from "../components/Hero";
import Map from "../components/Map";
import CallToActionWithAnnotation from "../components/Sponsor";
import { CurrentMarkerContext, LocationContext } from "../lib/context";

export default function Home() {
  const { locations } = useContext(LocationContext);
  const { setCurrentMarker } = useContext(CurrentMarkerContext);

  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      as="main"
      w={"full"}
      direction="column"
      h="full"
      backgroundColor={"white"}
      alignItems={"center"}
    >
      <DashboardShell full={true}>
        <CallToActionWithVideo />

        <Box
          position={"relative"}
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          overflow={"hidden"}
          mb={20}
          id="map"
        >
          <Map locations={locations} isMobile={isMobile} />
        </Box>

        <Box>
          <Heading id="feature" mb={8}>
            Featured Food trucks in Hilo
          </Heading>

          <TruckGrid />
        </Box>
        <CallToActionWithAnnotation />
      </DashboardShell>
      <SmallCentered />
    </Box>
  );
}
