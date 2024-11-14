import { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

import { useLocationContext } from "../context/LocationContext";

const SearchFilter = ({ canDisplay }: { canDisplay: boolean }) => {
  const { state, dispatch } = useLocationContext();
  const { locations, filteredLocations } = state;

  const [searchQuery, setSearchQuery] = useState("");

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      dispatch({ type: "SET_FILTERED_LOCATIONS", locations: locations });
    } else {
      const filtered = locations.filter((location) =>
        location.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch({ type: "SET_FILTERED_LOCATIONS", locations: filtered });
    }
  };

  // Handle clear search query
  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  // Handle clear search results
  const handleClearSearch = () => {
    handleClearSearchQuery();
    dispatch({ type: "SET_FILTERED_LOCATIONS", locations: locations });
  };

  if (!canDisplay) {
    return (
      <div className="lg:mt-4 lg:order-2 text-current">
        <IoSearch size={32} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch} className="my-4 text-sm">
      <div className="relative">
        <input
          type="text"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-2 pr-8 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearchQuery}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search">
            <IoClose size={20} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
          aria-label="Search"
          disabled={searchQuery.length === 0}>
          <IoSearch className="text-white" size={20} />
        </button>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
        {/* Show thi button to reset query, OR if there are locations but no search results */}
        {(filteredLocations.length > 0 ||
          locations.length > filteredLocations.length) && (
          <button
            onClick={handleClearSearch}
            className="text-gray-400 hover:text-gray-600">
            Clear search
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchFilter;
