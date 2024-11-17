import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "./components/Container";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { useLoadScript } from "@react-google-maps/api";

// Google Maps libraries
const libraries: ("geometry" | "places")[] = ["geometry", "places"];

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  if (!isLoaded || loadError) {
    return (
      <div className="flex items-center justify-center h-screen">
        {loadError && (
          <div className="text-red-500">
            Error loading application. Please try again.
          </div>
        )}
        {!isLoaded && (
          <div className="flex flex-col items-center gap-2">
            <img
              src="/rollcall-icon.png"
              alt="Rollcall"
              className="w-10 h-10 text-gray-600 animate-bounce-custom"
            />
            <div>Loading Map...</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Container>
      <Sidebar />
      <Main />
      <ToastContainer className="text-xs" />
    </Container>
  );
};

export default App;
