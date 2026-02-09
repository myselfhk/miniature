"use client";

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "./toast";
import { useToast } from "@/components/admin/hooks/use-toast";

export default function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast key={toast.id}>
          <div>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description ? (
              <ToastDescription>{toast.description}</ToastDescription>
            ) : null}
          </div>
          <ToastClose onClick={() => dismissToast(toast.id)}>×</ToastClose>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
