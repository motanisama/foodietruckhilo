import { createContext } from "react";
export const LocationContext = createContext({
  locations: null,
});

export const CurrentMarkerContext = createContext({
  currentMarker: null,
  setCurrentMarker: null,
});

export const CurrentLocationContext = createContext({
  currentLocation: null,
  setCurrentLocation: null,
});
