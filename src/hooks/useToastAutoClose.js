import { useEffect, useState } from "react";

const useToastAutoClose = ({ toasts, removeToast }) => {
  useEffect(() => {
    if (toasts.length) {
      const id = toasts[toasts.length - 1].id;
      setTimeout(() => removeToast(id), 5000);
    }
  }, [toasts]);
};

export default useToastAutoClose;
