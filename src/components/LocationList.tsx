import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ConfirmDialog from "./ConfirmDialog";
import LocationListItem from "./LocationListItem";

import { useLocationContext } from "../context/LocationContext";
import { showSuccessToast } from "../utils/toast";

const LocationList = () => {
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
    showSuccessToast("Location deleted successfully");
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

  if (locations.length === 0) {
    return <div>You have not added any locations yet.</div>;
  }

  return (
    <>
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

      <ConfirmDialog
        isOpen={isDialogOpen}
        message="Are you sure you want to delete this location?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDialogCancel}
        confirmText="Delete"
        confirmBtnVariant="danger"
      />
    </>
  );
};

export default LocationList;
