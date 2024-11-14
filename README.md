# Roll Call Map Location Application

This project is a responsive, interactive map application that enables users to add, view, and manage locations on a map. The project utilizes Google Maps API for map and geocoding services and offers a virtualized list for efficient rendering of location data. It is built with React, TypeScript, and Tailwind CSS for styling, and includes a responsive sidebar for location management.

## ImplementedFeatures

### Map Features

- Responsive Google Maps view with interactive panning and zooming
- Location selection via click events on the map
- Custom marker icons with drop-in animation when a new location is added
- Clustering for multiple markers

### Sidebar Panel

- Collapsible sidebar with smooth transition animations for opening/closing
- Responsive layout for mobile and desktop, maintaining functionality and visibility
- Displays a list of added locations, including name, address, and distance from the user's location
- Hover effect and delete option for each location
- Badge with total location count on collapse; expands on hover for quick access
- Responsive search functionality for finding specific locations

### Location Management

- Option to confirm adding and deleting a location, with an error and success feedback using toasts
- Reverse geocoding for the selected location coordinates to retrieve place name and address

### Technical Features

- TypeScript for type safety
- Tailwind CSS for consistent and responsive styling
- Virtualized list for optimized rendering of locations

### Known Issues and Limitations

- Geolocation Permissions: Requires user consent for geolocation to display the current position accurately.

### Additional Notes

- Attempted to persist/sync locations in `localStorage` to survive page reloads, however, issue arose with markers not being displayed.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js v18.20.4 installed
- **React**: Ensure you have React v18.3.1 installed
- **Google Maps API Key**: Obtain an API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/athanph/rollcall-map.git
   cd rollcall-map
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the project root and add your Google Maps API key:

   ```bash
   VITE_GOOGLE_MAPS_API_KEY=<your-api-key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Project Structure

- `src/components/`: Contains UI components like Map, Sidebar, Marker, and LocationList.
- `src/context/`: Manages the global state of locations using React Context API.
- `src/hooks/`: Custom hooks
- `src/utils/`: Utility functions

### Stack

- Scaffolded with Vite
- TypeScript
- Tailwind CSS
- React Google Maps API
- React Window
- React Toastify
- React Icons
