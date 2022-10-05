import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { formatRelative, set } from "date-fns";
import { CurrentMarkerContext, LocationContext } from "../lib/context";

import mapStyles from "./mapStyles";
import { useFoodtruckData } from "../lib/hooks";

const mapContainerStyle = {
  width: "100%",
  height: "75vh",
};

const adminContainerStyle = {
  width: "100%",
  height: "50vh",
};
const center = {
  lat: 19.714312,
  lng: -155.077456,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles,
};

export default function Map({ locations, admin, foodTruckData }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
  });

  const [selected, setSelected] = useState(null);

  // use to optimize re-renders
  const onMapClick = useCallback((event) => {}, []);

  //maintain state without causing re-render
  const mapRef = useRef();

  const { setCurrentMarker } = useContext(CurrentMarkerContext);

  //
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
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
    <div className="map">
      <GoogleMap
        mapContainerStyle={admin ? adminContainerStyle : mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {
          //changed the key = username instead of dateISOString might break clicking to set new PIN
          locations?.map((marker, i) => (
            <Marker
              key={i}
              position={{ lat: marker.geo?.lat, lng: marker.geo?.lng }}
              onClick={() => {
                console.log(marker.truckName);
                document
                  .getElementById("feature")
                  .scrollIntoView({ behavior: "smooth" });
                setCurrentMarker(marker);
              }}
            />
          ))
        }
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
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
    </button>
  );
}
