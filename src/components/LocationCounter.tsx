import { FaMapMarkerAlt } from "react-icons/fa";
import { useLocationContext } from "../context/LocationContext";

const LocationCounter = () => {
  const { state } = useLocationContext();
  const { locations } = state;

  return (
    <div className="lg:mt-6 lg:order-3">
      <h2 className="font-semibold flex lg:flex-col items-center gap-1">
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
