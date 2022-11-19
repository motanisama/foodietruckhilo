import { Box } from "@chakra-ui/react";
import React from "react";
import Carousel from "../../components/Carousel";
import DashboardShell from "../../components/DashboardShell";

function index() {
  return (
    <DashboardShell>
      <Box
        backgroundImage={"linear-gradient(62deg, #FED7D7 0%, #F23535  100%);"}
        backgroundColor={"red.400"}
        height={"full"}
        width={"100vw"}
      >
        <Carousel />
      </Box>
    </DashboardShell>
  );
}

export default index;
