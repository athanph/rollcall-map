// TODO: Calculate distance to location
// TODO: Add error state when geocoding fails
// TODO: Show toast notification when location is added and when there is an error
// TODO: Add loading state animation when map is loading

import { useCallback, useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import ConfirmDialog from "./ConfirmDialog";
import MapMarker from "./MapMarker";

interface Location {
  lat: number;
  lng: number;
  address: string;
  name: string | null;
}

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
  const [locations, setLocations] = useState<Location[]>([]);
  const [newMarker, setNewMarker] = useState<Location>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleDialogConfirm = () => {
    setLocations([...locations, newMarker as Location]);
    setIsDialogOpen(false);
    setNewMarker(undefined);
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setNewMarker(undefined);
  };

  // Handle map click event
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker: Location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        address: "",
        name: "",
      };

      // Reverse geocoding
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: event.latLng }, (results, status) => {
        // If geocoding is successful, update marker details
        if (status === "OK" && results?.[0]) {
          const selectedLocation = results[0];
          newMarker.name =
            selectedLocation.address_components?.[0]?.short_name || null;
          newMarker.address = selectedLocation.formatted_address;

          // Add new marker
          setNewMarker(newMarker);
          setIsDialogOpen(true);
        } else {
          console.error("Geocoding failed:", status);
        }
      });
    }
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded || !center) return <div>Loading Map...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onClick={handleMapClick}>
        {locations.map((location, index) => (
          <MapMarker key={index} position={location} />
        ))}
      </GoogleMap>
      <ConfirmDialog
        isOpen={isDialogOpen}
        message="Are you sure you want to add this location?"
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </>
  );
};

export default MapView;
