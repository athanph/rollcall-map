import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { RiDeleteBin6Line } from "react-icons/ri";

import ConfirmDialog from "./ConfirmDialog";
import LocationListItem from "./LocationListItem";

import { useLocationContext } from "../context/LocationContext";
import { showSuccessToast } from "../utils/toast";
import { useDeviceType } from "../hooks/useDevice";

const LocationList = () => {
  const { isDesktop } = useDeviceType();
  const { state, dispatch } = useLocationContext();
  const { locations, filteredLocations } = state;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);

  // On click, select a single location to delete
  const handleSelectLocation = (index: number) => {
    setSelectedLocations((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // On click, select all locations to delete
  const handleSelectAll = () => {
    setSelectedLocations(
      selectedLocations.length === filteredLocations.length
        ? []
        : filteredLocations.map((_, index) => index)
    );
  };

  // Open the delete confirmation dialog for a single location
  const handleSingleDelete = (index: number) => {
    setIsDialogOpen(true);
    setSelectedIndex(index);
  };

  // Open the delete confirmation dialog for multiple locations
  const handleMultiDelete = () => {
    setIsDialogOpen(true);
  };

  // Delete a single location upon confirmation
  const handleSingleDeleteConfirm = () => {
    if (selectedIndex !== null) {
      dispatch({ type: "DELETE_LOCATION", index: selectedIndex });
    }
    setIsDialogOpen(false);
    setSelectedIndex(null);
    showSuccessToast("Location deleted successfully", isDesktop);
  };

  // Delete multiple locations upon confirmation
  const handleMultiDeleteConfirm = () => {
    // Sort indices in descending order to avoid shifting issues
    const sortedIndices = [...selectedLocations].sort((a, b) => b - a);
    sortedIndices.forEach((index) => {
      console.log(index);
      dispatch({ type: "DELETE_LOCATION", index });
    });
    setIsDialogOpen(false);
    setSelectedLocations([]);
    showSuccessToast(
      `${selectedLocations.length} locations deleted`,
      isDesktop
    );
  };

  // Close the delete confirmation dialog
  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setSelectedIndex(null);
  };

  // Render the list of locations
  const rowRenderer = ({ index }: { index: number }) => {
    const location = filteredLocations[index];
    return (
      <LocationListItem
        key={index}
        location={location}
        index={index}
        isSelected={selectedLocations.includes(index)}
        showCheckbox={selectedLocations.length > 0}
        onDelete={handleSingleDelete}
        onSelect={handleSelectLocation}
      />
    );
  };

  return (
    <>
      <div className="flex gap-2 items-center mb-8">
        <img src="/rollcall-icon.png" alt="Rollcall" className="w-6" />
        <h2 className="text-md font-semibold">
          <span className=" mr-1">Your Locations</span>
          {filteredLocations.length > 0 && `(${filteredLocations.length})`}
        </h2>
      </div>

      {selectedLocations.length > 0 && (
        <div className="mb-4 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedLocations.length === filteredLocations.length}
                onChange={handleSelectAll}
                className="rounded"
              />
              Select All
            </label>
            <button
              onClick={handleMultiDelete}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1">
              <RiDeleteBin6Line /> ({selectedLocations.length})
              <span className="sr-only">Delete Selected Locations</span>
            </button>
          </div>
        </div>
      )}

      {locations.length === 0 && (
        <div>You have not added any locations yet.</div>
      )}

      {locations.length > 0 && filteredLocations.length === 0 && (
        <div>No locations found matching your search.</div>
      )}

      {filteredLocations.length > 0 && (
        <>
          <div className="flex-1">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  innerElementType="ul"
                  height={height}
                  width={width}
                  itemCount={filteredLocations.length}
                  itemSize={116}>
                  {rowRenderer}
                </List>
              )}
            </AutoSizer>
          </div>

          <ConfirmDialog
            isOpen={isDialogOpen}
            message={`Are you sure you want to delete ${
              selectedLocations.length > 1
                ? `these ${selectedLocations.length} locations`
                : "this location"
            }?`}
            onConfirm={
              selectedLocations.length > 0
                ? handleMultiDeleteConfirm
                : handleSingleDeleteConfirm
            }
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
