import { useState, useEffect } from "react";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useLocationContext } from "../context/LocationContext";
import LocationList from "./LocationList";

import { cn } from "../utils/cn";

const Sidebar = () => {
  const { state, dispatch } = useLocationContext();
  const { locations, sidebarOpen } = state;

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  useEffect(() => {
    if (sidebarOpen || isSidebarHovered) {
      // Delay showing content until sidebar is expanded
      const timer = setTimeout(() => {
        setIsSidebarExpanded(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSidebarExpanded(false);
    }
  }, [sidebarOpen, isSidebarHovered]);

  return (
    <div
      onMouseEnter={() => !sidebarOpen && setIsSidebarHovered(true)}
      onMouseLeave={() => !sidebarOpen && setIsSidebarHovered(false)}
      className={cn("p-4 transition-all duration-300 z-10", {
        "w-[250px] flex flex-col": sidebarOpen || isSidebarHovered,
        "fixed top-0 left-0 h-full before:content-[''] before:absolute before:inset-0 before:z-[-1]":
          !sidebarOpen,
        "w-12 items-center text-white before:bg-gray-900  before:opacity-50":
          !sidebarOpen && !isSidebarHovered,
        "w-[250px] fixed top-0 left-0 h-full before:bg-white before:opacity-100 shadow-xl":
          !sidebarOpen && isSidebarHovered,
      })}>
      {/* Sidebar Toggle Button*/}
      <div className="flex justify-end">
        <button
          className={cn("transition-colors duration-300", {
            "text-gray-500 hover:text-gray-700":
              sidebarOpen || isSidebarHovered,
            "text-white": !sidebarOpen && !isSidebarHovered,
          })}
          onClick={toggleSidebar}>
          {sidebarOpen ? (
            <TbLayoutSidebarLeftCollapseFilled
              size={20}
              title="Unpin Sidebar"
            />
          ) : (
            <TbLayoutSidebarRightCollapseFilled size={20} title="Pin Sidebar" />
          )}
        </button>
      </div>

      {/* Location List */}
      {sidebarOpen || isSidebarHovered ? (
        <div
          className={cn(
            "flex flex-col h-full transition-opacity duration-300",
            {
              "opacity-0 hidden": !isSidebarExpanded,
              "opacity-100 visible": isSidebarExpanded,
            }
          )}>
          <div className="flex gap-2 items-center mb-4">
            <img src="/rollcall-icon.png" alt="Rollcall" className="w-6" />
            <h2 className="text-lg font-semibold">
              Locations {locations.length > 0 && `(${locations.length})`}
            </h2>
          </div>
          <div className="flex-1">
            <LocationList />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 mt-6">
          <FaMapMarkerAlt size={32} />
          <span className="bg-red-500 text-xs rounded-full px-2 py-1 text-white">
            {locations.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
