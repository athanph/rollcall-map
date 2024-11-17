import { MarkerF } from "@react-google-maps/api";

import type { LatLngLiteral } from "../context/LocationContext";

interface MapMarkerProps {
  position: LatLngLiteral;
  onClick?: () => void;
  icon?: google.maps.Icon;
  title?: string;
  clusterer?: any;
  draggable?: boolean;
  onDragEnd?: (event: google.maps.MapMouseEvent) => void;
}

const MapMarker = ({
  position,
  onClick,
  icon,
  title,
  clusterer,
  draggable,
  onDragEnd,
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
      draggable={draggable}
      onDragEnd={onDragEnd}
    />
  );
};

export default MapMarker;
