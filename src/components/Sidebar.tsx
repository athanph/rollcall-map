import { useState, useEffect } from "react";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";

import LocationList from "./LocationList";
import LocationCounter from "./LocationCounter";

import { cn } from "../utils/cn";
import { useLocationContext } from "../context/LocationContext";
import { useHoverDevice } from "../hooks/useHoverDevice";
import { useDeviceType } from "../hooks/useDevice";

const Sidebar = () => {
  const isHoverDevice = useHoverDevice();
  const { isDesktop } = useDeviceType();

  const { state, dispatch } = useLocationContext();
  const { sidebarOpen } = state;

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  // Close sidebar on mobile
  useEffect(() => {
    if (!isDesktop) {
      dispatch({ type: "TOGGLE_SIDEBAR", sidebarOpen: false });
      setIsSidebarHovered(false);
    }
  }, [!isDesktop]);

  // Delay showing content until sidebar is expanded
  useEffect(() => {
    if (sidebarOpen || isSidebarHovered) {
      const timer = setTimeout(() => {
        setIsSidebarExpanded(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSidebarExpanded(false);
    }
  }, [sidebarOpen, isSidebarHovered]);

  // Handle mouse events
  // Only show hover state on devices with hover capabilities
  const handleMouseEvents = isHoverDevice
    ? {
        onMouseEnter: () => !sidebarOpen && setIsSidebarHovered(true),
        onMouseLeave: () => !sidebarOpen && setIsSidebarHovered(false),
      }
    : {};

  return (
    <div
      data-sidebar-open={sidebarOpen}
      {...handleMouseEvents}
      className={cn(
        "p-2 lg:p-4 bg-white shadow-xl transition-all duration-300 z-10 flex",
        {
          // Sidebar open or hovered
          "fixed top-0 left-0 w-full h-full lg:w-[250px] flex-col":
            sidebarOpen || isSidebarHovered,

          // Sidebar closed
          "fixed top-0 left-0 h-12 lg:h-full lg:before:content-[''] before:absolute before:inset-0 before:z-[-1]":
            !sidebarOpen,

          // Sidebar closed and not hovered
          "w-full lg:w-12 items-center flex-col lg:bg-transparent lg:text-white lg:before:bg-gray-900 lg:before:opacity-50":
            !sidebarOpen && !isSidebarHovered,

          // Sidebar closed and hovered
          "lg:w-[250px] fixed top-0 left-0 h-full lg:before:bg-white lg:before:opacity-100":
            !sidebarOpen && isSidebarHovered,
        }
      )}>
      {/* Sidebar Toggle Button*/}
      <div
        className={cn("flex w-full justify-end", {
          "lg:justify-center": !sidebarOpen && !isSidebarHovered,
        })}>
        <button
          className={cn("transition-colors duration-300", {
            "text-gray-500  hover:text-gray-700":
              sidebarOpen || isSidebarHovered,
            "lg:text-white": !sidebarOpen && !isSidebarHovered,
          })}
          onClick={toggleSidebar}>
          {sidebarOpen ? (
            <TbLayoutSidebarLeftCollapseFilled
              size={!isDesktop ? 32 : 24}
              title="Collapse"
              className="rotate-90 lg:rotate-0"
            />
          ) : (
            <TbLayoutSidebarRightCollapseFilled
              size={!isDesktop ? 32 : 24}
              title="Expand"
              className="rotate-90 lg:rotate-0"
            />
          )}
        </button>
      </div>

      {/* Location List */}
      {sidebarOpen || isSidebarHovered ? (
        <div
          className={cn(
            "flex flex-col h-full transition-opacity duration-300 mt-4",
            {
              "opacity-0 hidden": !isSidebarExpanded,
              "opacity-100 visible": isSidebarExpanded,
            }
          )}>
          <LocationList />
        </div>
      ) : (
        <LocationCounter />
      )}
    </div>
  );
};

export default Sidebar;
