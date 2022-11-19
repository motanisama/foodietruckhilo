import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { formatRelative, set } from "date-fns";
import {
  CurrentLocationContext,
  CurrentMarkerContext,
  LocationContext,
} from "../lib/context";

import mapStyles from "./mapStyles";
import { useFoodtruckData } from "../lib/hooks";
import {
  Button,
  Image,
  Spinner,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import TruckModal from "./TruckModal";

const center = {
  lat: 19.714312,
  lng: -155.077456,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles,
};

export default function Map({
  locations,
  admin,
  foodTruckData,
  isMobile,
  mapContainerStyle,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
  });

  const [selected, setSelected] = useState(null);

  // use to optimize re-renders
  const onMapClick = useCallback((event) => {}, []);

  //maintain state without causing re-render
  const mapRef = useRef();

  const { setCurrentMarker, currentMarker } = useContext(CurrentMarkerContext);
  const { currentLocation, setCurrentLocation } = useContext(
    CurrentLocationContext
  );
  //
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  // useEffect(() => {
  //   locations?.map((location) => {
  //     setMarkers((current) => [
  //       ...current,
  //       {
  //         lat: location.location.lat,
  //         lng: location.location.lng,
  //         time: new Date(),
  //         key: location.username,
  //       },
  //     ]);
  //   });

  //   console.log(markers);
  // }, [locations]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map" id="map">
      <GoogleMap
        mapContainerStyle={admin ? adminContainerStyle : mapContainerStyle}
        zoom={currentMarker ? 18 : 15}
        center={currentMarker ? currentMarker.geo : center}
        options={options}
        onLoad={onMapLoad}
        loadingElement={<Spinner />}
      >
        {
          //changed the key = username instead of dateISOString might break clicking to set new PIN
          locations?.map((marker, i) => (
            <>
              <Marker
                key={marker.id}
                position={{ lat: marker.geo?.lat, lng: marker.geo?.lng }}
                onClick={() => {
                  console.log(marker);
                  setSelected(marker);

                  if (isMobile) {
                    document
                      .getElementById(marker.truckName)
                      .scrollIntoView({ behavior: "smooth" });
                  } else {
                    document
                      .getElementById("feature")
                      .scrollIntoView({ behavior: "smooth" });
                  }

                  setCurrentMarker(marker);
                }}
              />
            </>
          ))
        }

        {currentLocation && (
          <Marker
            position={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo, setCurrentLocation }) {
  return (
    <Button
      style={{ position: "absolute", zIndex: "10", margin: "2rem" }}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            panTo({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Locate me!
    </Button>
  );
}
