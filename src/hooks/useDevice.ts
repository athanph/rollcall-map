import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
}

export const useDeviceType = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;

      // Check touch capability
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0;

      // Define breakpoints
      const isMobile = width < 768; // Below tablet
      const isTablet = width >= 768 && width < 1024; // Tablet breakpoint
      const isDesktop = width >= 1024; // Desktop breakpoint

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        hasTouch,
      });
    };

    // Initial check
    updateDeviceInfo();

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceInfo);

    return () => window.removeEventListener("resize", updateDeviceInfo);
  }, []);

  return deviceInfo;
};

// Utility function to check for iOS devices
export const isIOS = () => {
  if (typeof window === "undefined") return false;

  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.userAgent) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};
