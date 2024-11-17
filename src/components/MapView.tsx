import { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerClustererF } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";

import ConfirmDialog from "./ConfirmDialog";
import MapMarker from "./MapMarker";

import {
  type LatLngLiteral,
  type Location,
  useLocationContext,
} from "../context/LocationContext";
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
  const { filteredLocations } = state;

  const [center, setCenter] = useState<LatLngLiteral>();
  const [newMarker, setNewMarker] = useState<LatLngLiteral | null>(null);
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
        (error) => {
          console.error("Geolocation error:", error.message);
          setCenter(defaultCenter);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCenter(defaultCenter);
    }
  }, []);

  const clustererOptions = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    maxZoom: 20,
    minimumClusterSize: 2,
  };

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

  // Cancel the Add Location dialog
  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setNewMarker(null);
  };

  // Confirm the dialog
  const handleDialogConfirm = () => {
    const newLocation: Location = {
      ...(newMarker as LatLngLiteral),
      id: uuidv4(),
      address: "",
      name: "",
      distance: 0,
    };

    // Reverse geocoding
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newMarker }, async (results, status) => {
        // If geocoding is successful, update marker details
        if (status === "OK" && results?.[0]) {
          const selectedLocation = results[0];
          newLocation.name =
            selectedLocation.address_components?.[0]?.short_name || null;
          newLocation.address = selectedLocation.formatted_address;
          newLocation.distance = await calculateDistance(
            center as LatLngLiteral,
            newMarker as LatLngLiteral
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

  // Handle "You Are Here" marker drag end to update `center` and
  // the existing locations' distances
  const handleMarkerDragEnd = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newCenter = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setCenter(newCenter);

        // Recalculate distances for all locations
        if (filteredLocations.length > 0) {
          const updatedLocations = await Promise.all(
            filteredLocations.map(async (location) => ({
              ...location,
              distance: await calculateDistance(newCenter, {
                lat: location.lat,
                lng: location.lng,
              }),
            }))
          );
          dispatch({ type: "UPDATE_LOCATIONS", locations: updatedLocations });
        }
      }
    },
    [filteredLocations, dispatch]
  );

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
        {filteredLocations.length > 0 && (
          <MarkerClustererF options={clustererOptions}>
            {(clusterer) => (
              <>
                {filteredLocations.map((location) => (
                  <MapMarker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name || location.address}
                    clusterer={clusterer}
                  />
                ))}
              </>
            )}
          </MarkerClustererF>
        )}

        {/* "You are here" Marker */}
        {center && (
          <MapMarker
            position={center}
            icon={{
              url: "/marker-user.png",
              scaledSize: new google.maps.Size(50, 75),
            }}
            title="You're here"
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
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
