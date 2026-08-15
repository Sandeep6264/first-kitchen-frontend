import { toast } from "react-toastify";

// Common config
const baseConfig = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
};

// Success
export const notifySuccess = (msg) => {
  toast.success(msg, {
    ...baseConfig,
    style: {
      background: "#16a34a",
      color: "white",
      fontSize: "15px",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
    }
  });
};

// Error
export const notifyError = (msg) => {
  toast.error(msg, {
    ...baseConfig,
    style: {
      background: "#dc2626",
      color: "white",
      fontSize: "15px",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
    }
  });
};

// Warning
export const notifyWarning = (msg) => {
  toast.warning(msg, {
    ...baseConfig,
    style: {
      background: "#f59e0b",
      color: "black",
      fontSize: "15px",
      borderRadius: "8px"
    }
  });
};

// Info
export const notifyInfo = (msg) => {
  toast.info(msg, {
    ...baseConfig,
    style: {
      background: "#3b82f6",
      color: "white",
      fontSize: "15px",
      borderRadius: "8px"
    }
  });
};
