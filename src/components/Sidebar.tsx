import { useLocationContext } from "../context/LocationContext";
import LocationList from "./LocationList";

const Sidebar = () => {
  const { state } = useLocationContext();
  const { locations } = state;

  return (
    <div className="flex flex-col p-4 w-[250px]">
      <div className="flex gap-2 items-center mb-4">
        <img src="/rollcall-icon.png" alt="Rollcall" className="w-6" />
        <h2 className="text-lg font-semibold">
          Locations {locations.length > 0 && `(${locations.length})`}
        </h2>
      </div>

      <div className="flex-1">
        <LocationList />
      </div>
    </div>
  );
};

export default Sidebar;
