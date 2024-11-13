import { useState } from "react";

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

  if (locations.length === 0) {
    return <div>You have not added any locations yet.</div>;
  }

  return (
    <>
      <ul className="space-y-4">
        {locations.map((location, index) => (
          <LocationListItem
            key={index}
            location={location}
            index={index}
            handleDelete={handleDelete}
          />
        ))}
      </ul>

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
