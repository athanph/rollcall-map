import { MarkerF } from "@react-google-maps/api";

import type { LatLngLiteral } from "../context/LocationContext";

interface MapMarkerProps {
  position: LatLngLiteral;
  onClick?: () => void;
  icon?: google.maps.Icon;
  title?: string;
  clusterer?: any;
}

const MapMarker = ({
  position,
  onClick,
  icon,
  title,
  clusterer,
}: MapMarkerProps) => {
  return (
    <MarkerF
      position={position}
      icon={
        icon || {
          url: "/rollcall-marker.png",
          scaledSize: new window.google.maps.Size(50, 50),
        }
      }
      animation={google.maps.Animation.DROP}
      onClick={onClick}
      title={title}
      clusterer={clusterer}
    />
  );
};

export default MapMarker;
