import { useState, useEffect } from "react";

export const useHoverDevice = () => {
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mediaQuery.matches);

    const updateHoverCapability = (e: MediaQueryListEvent) =>
      setIsHoverDevice(e.matches);
    mediaQuery.addEventListener("change", updateHoverCapability);

    return () =>
      mediaQuery.removeEventListener("change", updateHoverCapability);
  }, []);

  return isHoverDevice;
};
