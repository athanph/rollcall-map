import type { Location } from "../context/LocationContext";

const LocationListItem = ({
  location,
  index,
  handleDelete,
}: {
  location: Location;
  index: number;
  handleDelete: (index: number) => void;
}) => {
  return (
    <li className="p-3 bg-gray-100 rounded-md shadow hover:bg-gray-200 text-gray-600">
      <div className="text-sm font-medium">
        {location.name || "Unnamed Location"}
      </div>
      <div className="text-xs ">{location.address}</div>
      <div className="text-xs text-green-700">
        {location.distance.toFixed(2)} km away
      </div>
      <button
        onClick={() => handleDelete(index)}
        className="mt-2 text-red-500 hover:text-red-700 text-xs">
        Delete
      </button>
    </li>
  );
};

export default LocationListItem;
