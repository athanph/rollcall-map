import { toast } from "react-toastify";

export const showSuccessToast = (message: string, isDesktop: boolean) => {
  toast.success(message, {
    position: isDesktop ? "top-right" : "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorToast = (message: string, isDesktop: boolean) => {
  toast.error(message, {
    position: isDesktop ? "top-right" : "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
