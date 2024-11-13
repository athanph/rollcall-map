import { Marker } from "@react-google-maps/api";

interface MapMarkerProps {
  position: google.maps.LatLngLiteral;
  onClick?: () => void;
}

const MapMarker = ({ position, onClick }: MapMarkerProps) => {
  return (
    <Marker
      position={position}
      icon={{
        url:
          "/rollcall-marker.png" ||
          "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new window.google.maps.Size(50, 50),
      }}
      animation={google.maps.Animation.DROP}
      onClick={onClick}
    />
  );
};

export default MapMarker;
