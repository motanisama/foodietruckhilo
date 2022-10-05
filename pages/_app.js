import { ChakraProvider } from "@chakra-ui/react";
import { ProviderAuth } from "../lib/auth";
import { LocationContext, CurrentMarkerContext } from "../lib/context";
import { useCurrentMarker, useLocationData } from "../lib/hooks";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const locationData = useLocationData();
  const currentMarker = useCurrentMarker();
  return (
    <ChakraProvider theme={theme}>
      <ProviderAuth>
        <CurrentMarkerContext.Provider value={currentMarker}>
          <LocationContext.Provider value={locationData}>
            <Component {...pageProps} />
          </LocationContext.Provider>
        </CurrentMarkerContext.Provider>
      </ProviderAuth>
    </ChakraProvider>
  );
}

export default MyApp;
