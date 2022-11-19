import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useContext } from "react";
import { LocationContext } from "../lib/context";
import SocialProfileSimple from "./Card";
import Cardrow from "./Cardrow";

export function TruckGrid() {
  const { locations } = useContext(LocationContext);

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={4} mb={20}>
      {locations?.map((data) => (
        <SocialProfileSimple data={data} key={data.truckName} />
      ))}
    </SimpleGrid>
  );
}
