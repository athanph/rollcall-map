import { FaMapMarkerAlt } from "react-icons/fa";
import { useLocationContext } from "../context/LocationContext";

const LocationCounter = () => {
  const { state } = useLocationContext();
  const { locations } = state;

  return (
    <div className="absolute top-3 left-3 lg:relative lg:top-0 lg:left-0 lg:right-0 flex lg:flex-col items-center gap-2 lg:mt-6">
      <h2 className="text-md font-semibold flex lg:flex-col items-center gap-1">
        <img
          src="/rollcall-icon.png"
          alt="Rollcall"
          className="lg:hidden w-6"
        />
        <FaMapMarkerAlt size={32} className="hidden lg:block" />
        <span className="lg:hidden mr-2">Your Locations</span>
        <span className="bg-red-500 text-xs rounded-full px-2 py-1 text-white">
          {locations.length}
        </span>
      </h2>
    </div>
  );
};

export default LocationCounter;
