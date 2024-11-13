import { type ReactNode, useReducer } from "react";

import {
  locationReducer,
  initialState,
  LocationContext,
} from "../context/LocationContext";

// Map Location Provider
const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
