declare module 'react-hot-toast' {
  import { ReactNode } from 'react';
  
  type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
  type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  
  interface ToastOptions {
    duration?: number;
    position?: ToastPosition;
    icon?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ariaProps?: {
      role: 'status' | 'alert';
      'aria-live': 'polite' | 'assertive' | 'off';
    };
  }
  
  interface Toast extends ToastOptions {
    id: string;
    type: ToastType;
    message: ReactNode;
    icon?: ReactNode;
    duration?: number;
    position?: ToastPosition;
    createdAt: number;
    visible: boolean;
    height?: number;
  }
  
  interface ToasterProps {
    position?: ToastPosition;
    toastOptions?: ToastOptions;
    reverseOrder?: boolean;
    gutter?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
  }
  
  export const Toaster: React.FC<ToasterProps>;
  
  export function toast(message: ReactNode, opts?: ToastOptions): string;
  export function toast.success(message: ReactNode, opts?: ToastOptions): string;
  export function toast.error(message: ReactNode, opts?: ToastOptions): string;
  export function toast.loading(message: ReactNode, opts?: ToastOptions): string;
  export function toast.custom(message: ReactNode, opts?: ToastOptions): string;
  export function toast.dismiss(toastId?: string): void;
  export function toast.remove(toastId?: string): void;
  export function toast.promise<T>(
    promise: Promise<T>,
    msgs: {
      loading: ReactNode;
      success: ReactNode | ((data: T) => ReactNode);
      error: ReactNode | ((error: any) => ReactNode);
    },
    opts?: ToastOptions
  ): Promise<T>;
  
  export function useToaster(): {
    toasts: Toast[];
    handlers: {
      startPause: () => void;
      endPause: () => void;
      updateHeight: (toastId: string, height: number) => void;
      updateToast: (toast: Toast) => void;
      startDismiss: (toastId: string) => void;
      endDismiss: (toastId: string) => void;
    };
  };
}
