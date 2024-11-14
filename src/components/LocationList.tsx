import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ConfirmDialog from "./ConfirmDialog";
import LocationListItem from "./LocationListItem";

import { useLocationContext } from "../context/LocationContext";
import { showSuccessToast } from "../utils/toast";
import { useDeviceType } from "../hooks/useDevice";

const LocationList = () => {
  const { isDesktop } = useDeviceType();
  const { state, dispatch } = useLocationContext();
  const { locations } = state;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    setIsDialogOpen(true);
    setSelectedIndex(index);
  };

  const handleDeleteConfirm = () => {
    dispatch({ type: "DELETE_LOCATION", index: selectedIndex as number });
    setIsDialogOpen(false);
    setSelectedIndex(null);
    showSuccessToast("Location deleted successfully", isDesktop);
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setSelectedIndex(null);
  };

  const rowRenderer = ({ index }: { index: number }) => {
    const location = locations[index];
    return (
      <LocationListItem
        key={index}
        location={location}
        index={index}
        handleDelete={handleDelete}
      />
    );
  };

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <img src="/rollcall-icon.png" alt="Rollcall" className="w-6" />
        <h2 className="text-md font-semibold">
          Your Locations {locations.length > 0 && `(${locations.length})`}
        </h2>
      </div>

      {locations.length === 0 ? (
        <div>You have not added any locations yet.</div>
      ) : (
        <>
          <div className="flex-1">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  innerElementType="ul"
                  height={height}
                  width={width}
                  itemCount={locations.length}
                  itemSize={116}>
                  {rowRenderer}
                </List>
              )}
            </AutoSizer>
          </div>

          <ConfirmDialog
            isOpen={isDialogOpen}
            message="Are you sure you want to delete this location?"
            onConfirm={handleDeleteConfirm}
            onCancel={handleDialogCancel}
            confirmText="Delete"
            confirmBtnVariant="danger"
          />
        </>
      )}
    </>
  );
};

export default LocationList;
