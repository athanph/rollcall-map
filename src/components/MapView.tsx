import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

// Default center if user's location is not available (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapView = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Geolocation permission denied or unavailable.");
          setCenter(defaultCenter);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCenter(defaultCenter);
    }
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded || !center) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}>
      {/* Location markers here */}
    </GoogleMap>
  );
};

export default MapView;
