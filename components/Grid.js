import { Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import { LocationContext } from "../lib/context";
import SocialProfileSimple from "./Card";
import Cardrow from "./Cardrow";

export function TruckGrid() {
  const { locations } = useContext(LocationContext);

  return (
    <Grid templateColumns="repeat(3, 4fr)" gap={4}>
      {locations?.map((data) => (
        <GridItem w="100%">
          <SocialProfileSimple data={data} />
        </GridItem>
      ))}
    </Grid>
  );
}
