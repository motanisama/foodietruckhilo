import { ChakraProvider } from "@chakra-ui/react";
import { ProviderAuth } from "../lib/auth";
import {
  LocationContext,
  CurrentMarkerContext,
  CurrentLocationContext,
} from "../lib/context";
import {
  useCurrentLocation,
  useCurrentMarker,
  useLocationData,
} from "../lib/hooks";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const locationData = useLocationData();
  const currentMarker = useCurrentMarker();
  const currentLocation = useCurrentLocation();
  return (
    <ChakraProvider theme={theme}>
      <ProviderAuth>
        <CurrentLocationContext.Provider value={currentLocation}>
          <CurrentMarkerContext.Provider value={currentMarker}>
            <LocationContext.Provider value={locationData}>
              <Component {...pageProps} />
            </LocationContext.Provider>
          </CurrentMarkerContext.Provider>
        </CurrentLocationContext.Provider>
      </ProviderAuth>
    </ChakraProvider>
  );
}

export default MyApp;
