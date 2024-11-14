import type { LatLngLiteral } from "../context/LocationContext";

// Calculate and return road distance between two points in km
// Using Google Maps Distance Matrix Service
export const calculateDistance = (
  marker1: LatLngLiteral,
  marker2: LatLngLiteral
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [{ lat: marker1.lat, lng: marker1.lng }],
        destinations: [{ lat: marker2.lat, lng: marker2.lng }],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK" && response) {
          const distance = response.rows[0].elements[0].distance.value; // distance in meters
          resolve(distance / 1000);
        } else {
          reject(new Error("Failed to calculate road distance"));
        }
      }
    );
  });
};
