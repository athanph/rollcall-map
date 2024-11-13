import { cn } from "../utils/cn";

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmBtnVariant?: "default" | "danger";
  cancelBtnVariant?: "default" | "danger";
}

const ConfirmDialog = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmBtnVariant = "default",
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  const btnStyles =
    "px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors";
  const confirmBtnStyles = cn(btnStyles, "text-white ", {
    "bg-green-600 hover:bg-green-700": confirmBtnVariant === "default",
    "bg-red-600 hover:bg-red-700": confirmBtnVariant === "danger",
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <p className=" mb-4">{message}</p>
        <div className="flex justify-end space-x-2 text-sm">
          <button onClick={onCancel} className={btnStyles}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={confirmBtnStyles}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
