import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

type MapComponentProps = {
  initialLatitude: number;
  initialLongitude: number;
  isDraggable: boolean;
  setOpen: (open: boolean) => void;
  setIsDraggable: (value: boolean) => void;
};

const MapComponent = ({
  initialLatitude,
  initialLongitude,
  isDraggable,
  setOpen,
  setIsDraggable,
}: MapComponentProps) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: initialLatitude,
    lng: initialLongitude,
  });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_YOUR_API_KEY!,
  });

  const handleMarkerDrag = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleMarkerDragEnd = () => {
    setIsInfoWindowOpen(true);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={17}
      center={markerPosition}
      onClick={(e) => {
        if (!e.latLng) return;
        setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }}
      mapTypeId="roadmap"
    >
      <Marker
        position={markerPosition}
        draggable={isDraggable}
        onDrag={handleMarkerDrag}
        onDragEnd={handleMarkerDragEnd}
      />

      {isInfoWindowOpen && (
        <InfoWindow
          position={markerPosition}
          onCloseClick={() => setIsInfoWindowOpen(false)}
        >
          <div>
            <p style={{ color: "black" }}>
              Click yes if the location is correct
            </p>
            <button
              style={{
                backgroundColor: "#003F32",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
              onClick={() => {
                localStorage.setItem("distance", "200");
                setOpen(true);
                setIsDraggable(false);
                setIsInfoWindowOpen(false);
              }}
            >
              Yes
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
