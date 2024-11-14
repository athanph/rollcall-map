// TODO: Add loading state animation when map is loading

import { useCallback, useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import ConfirmDialog from "./ConfirmDialog";
import MapMarker from "./MapMarker";

import { type Location, useLocationContext } from "../context/LocationContext";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { calculateDistance } from "../utils/helpers";
import { useDeviceType } from "../hooks/useDevice";

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
  const { isDesktop } = useDeviceType();
  const { state, dispatch } = useLocationContext();
  const { locations } = state;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>();
  const [newMarker, setNewMarker] = useState<google.maps.LatLngLiteral | null>(
    null
  );
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

  // Handle map click event
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setNewMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setIsDialogOpen(true);
    }
  }, []);

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setNewMarker(null);
  };

  const handleDialogConfirm = () => {
    const newLocation: Location = {
      ...(newMarker as google.maps.LatLngLiteral),
      address: "",
      name: "",
      distance: 0,
    };

    // Reverse geocoding
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newMarker }, (results, status) => {
        // If geocoding is successful, update marker details
        if (status === "OK" && results?.[0]) {
          const selectedLocation = results[0];
          newLocation.name =
            selectedLocation.address_components?.[0]?.short_name || null;
          newLocation.address = selectedLocation.formatted_address;
          newLocation.distance = calculateDistance(
            center?.lat || 0,
            center?.lng || 0,
            newLocation.lat,
            newLocation.lng
          );

          // Add new marker
          dispatch({ type: "ADD_LOCATION", location: newLocation });
          showSuccessToast("Location added successfully", isDesktop);
        } else {
          console.error("Geocoding failed:", status);
          showErrorToast("Error adding location. Please try again.", isDesktop);
        }
      });

      setIsDialogOpen(false);
      setNewMarker(null);
    } catch (error) {
      console.error(error);
      showErrorToast("Error adding location. Please try again.", isDesktop);
    }
  };

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
        {/* User selected markers */}
        {locations.map((location, index) => (
          <MapMarker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name || location.address}
          />
        ))}

        {/* "You are here" Marker */}
        {center && (
          <MapMarker
            position={center}
            icon={{
              url: "/marker-user.png",
              scaledSize: new google.maps.Size(50, 75),
            }}
            title="You're here"
          />
        )}
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
