"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastProps["type"]) => void;
  hideToast: () => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function Toast({ message, type = "info", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "fixed bottom-4 right-4 p-4 rounded-md shadow-lg max-w-sm z-50 flex items-center justify-between";

  const typeClasses = {
    success: "bg-green-100 border border-green-200 text-green-800",
    error: "bg-red-100 border border-red-200 text-red-800",
    warning: "bg-amber-100 border border-amber-200 text-amber-800",
    info: "bg-blue-100 border border-blue-200 text-blue-800"
  };

  return (
    <div className={cn(baseClasses, typeClasses[type])}>
      <p className="pr-4">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<{ message: string; type: ToastProps["type"] } | null>(null);

  const showToast = React.useCallback((message: string, type: ToastProps["type"] = "info") => {
    setToast({ message, type });
  }, []);

  const hideToast = React.useCallback(() => {
    setToast(null);
  }, []);

  const contextValue = React.useMemo(() => ({ showToast, hideToast }), [showToast, hideToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
