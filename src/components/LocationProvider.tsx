import { type ReactNode, useEffect, useReducer } from "react";

import {
  locationReducer,
  initialState,
  LocationContext,
} from "../context/LocationContext";

// Map Location Provider
const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  // Initialize `filteredLocations` with all locations
  useEffect(() => {
    if (state.locations.length > 0) {
      dispatch({ type: "SET_FILTERED_LOCATIONS", locations: state.locations });
    }
  }, [state.locations]);

  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
