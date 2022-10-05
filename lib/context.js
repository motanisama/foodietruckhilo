import { createContext } from "react";
export const LocationContext = createContext({
  locations: null,
});

export const CurrentMarkerContext = createContext({
  currentMarker: null,
  setCurrentMarker: null,
});
