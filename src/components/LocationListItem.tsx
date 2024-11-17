import { RiDeleteBin6Line } from "react-icons/ri";

import type { Location } from "../context/LocationContext";
import { cn } from "../utils/cn";

interface LocationListItemProps {
  location: Location;
  isSelected: boolean;
  showCheckbox: boolean;
  onDelete: (locationId: string) => void;
  onSelect: (locationId: string) => void;
}

const LocationListItem = ({
  location,
  isSelected,
  showCheckbox,
  onDelete,
  onSelect,
}: LocationListItemProps) => {
  return (
    <li
      className={cn(
        "relative group mb-2 ml-2 rounded-md border border-gray-200 hover:border-gray-500 shadow-md text-gray-600 transition-all duration-300",
        {
          "border-gray-500": isSelected,
        }
      )}>
      {/* Select Checkbox */}
      <div
        className={`absolute left-[-8px] top-1/2 -translate-y-1/2 transition-opacity
        ${showCheckbox ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(location.id)}
          className="rounded bg-gray-500"
        />
      </div>

      {/* Location Details */}
      <div className="relative p-4">
        <div className="text-sm font-medium">
          {location.name || "Unnamed Location"}
        </div>
        <div className="text-xs ">{location.address}</div>
        <div className="text-xs text-green-700">
          {location.distance.toFixed(2)} km away
        </div>
        <button
          onClick={() => onDelete(location.id)}
          className="lg:hidden group-hover:block bg-white hover:bg-red-500 absolute top-1 right-1 p-1 rounded-full text-red-500 hover:text-white transition-all duration-300 text-xs">
          <RiDeleteBin6Line />
          <span className="sr-only">Delete Location</span>
        </button>
      </div>
    </li>
  );
};

export default LocationListItem;
