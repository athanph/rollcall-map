import { createContext, useContext } from "react";

export type LatLngLiteral = google.maps.LatLngLiteral;

export interface Location {
  id: string;
  lat: number;
  lng: number;
  address: string;
  name: string | null;
  distance: number;
}

export interface State {
  locations: Location[];
  filteredLocations: Location[];
  sidebarOpen: boolean;
}

interface LocationContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Map Location Actions
type Action =
  | { type: "ADD_LOCATION"; location: Location }
  | { type: "UPDATE_LOCATIONS"; locations: Location[] }
  | { type: "DELETE_LOCATION"; locationId: string }
  | { type: "SET_FILTERED_LOCATIONS"; locations: Location[] }
  | { type: "TOGGLE_SIDEBAR"; sidebarOpen?: boolean };

// Map Location Initial State
export const initialState: State = {
  locations: [],
  filteredLocations: [],
  sidebarOpen: true,
};

// Map Location Reducer
export const locationReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LOCATION":
      return { ...state, locations: [...state.locations, action.location] };
    case "UPDATE_LOCATIONS":
      return {
        ...state,
        filteredLocations: action.locations,
        locations: action.locations,
      };
    case "DELETE_LOCATION":
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.locationId
        ),
      };
    case "SET_FILTERED_LOCATIONS":
      return {
        ...state,
        filteredLocations: action.locations,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.sidebarOpen ?? !state.sidebarOpen,
      };
    default:
      return state;
  }
};

// Map Location Context
export const LocationContext = createContext<LocationContextType>({
  state: initialState,
  dispatch: () => null,
});

// Map Location Context Hook
export const useLocationContext = () => useContext(LocationContext);
