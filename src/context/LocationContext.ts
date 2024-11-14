import { createContext, useContext } from "react";

export interface Location {
  lat: number;
  lng: number;
  address: string;
  name: string | null;
  distance: number;
}

export interface State {
  locations: Location[];
  sidebarOpen: boolean;
}

interface LocationContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Map Location Actions
type Action =
  | { type: "ADD_LOCATION"; location: Location }
  | { type: "DELETE_LOCATION"; index: number }
  | { type: "TOGGLE_SIDEBAR" };

// Map Location Initial State
export const initialState: State = {
  locations: [],
  sidebarOpen: true,
};

// Map Location Reducer
export const locationReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LOCATION":
      return { ...state, locations: [...state.locations, action.location] };
    case "DELETE_LOCATION":
      return {
        ...state,
        locations: state.locations.filter((_, i) => i !== action.index),
      };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
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
