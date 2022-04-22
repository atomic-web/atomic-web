import { useContext } from 'react';
import { ToastContext } from './toast-context';
import { getId } from '../../utils/misc';
import { Timer } from '../../utils/timer';
import { MouseEvent } from 'react';
import { useToastOptions } from './options';

export interface UseToastParams {
  message: React.ReactNode;
  type: ToastType;
  actions?: ToastAction[];
  options?: ToastOptions;
}

export type ToastType = 'info' | 'success' | 'error' | 'warning';
export interface AddToastReturn {
  close: () => void;
}

export interface UseToastReturn {
  addToast: (info: UseToastParams) => void;
}

export interface ToastInstance {
  visible: boolean;
  cancel: () => void;
  id: string;
  _timer: null | Timer;
}

export type Toast = UseToastParams & ToastInstance;

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export type ToastAction = {
  primary?: boolean;
  content: React.ReactNode;
  handler: (e: MouseEvent<unknown>, cancel: () => void) => void;
};

export type ToastOptions = {
  type?: ToastType;
  position?: ToastPosition;
  animationDuration?: number;
  toastDuration?: number;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  autoClose?: boolean;
};

const useToast = (options?: ToastOptions) => {
  const { toasts, updateToasts } = useContext(ToastContext);
  const globalOptions = useToastOptions(undefined, options);
  const animationDuration = globalOptions.animationDuration;
  const toastDuration = globalOptions.toastDuration;

  const cancel = (id: string) => {
    updateToasts((_toasts) =>
      _toasts.map((toast) => {
        if (toast.id === id) {
          window.setTimeout(
            () => removeById(id),
            toast.options?.animationDuration ?? animationDuration
          );
          return { ...toast, visible: false };
        }
        return toast;
      })
    );
  };

  const removeById = (id: string) => {
    updateToasts((_toasts) => _toasts.filter((toast) => toast.id !== id));
  };

  const addToast = (info: UseToastParams, id?: string) => {
    if (id && toasts.some((toast) => toast.id === id)) {
      throw new Error(`Toast with id ${id} already exists`);
    }

    const autoClose = info.options?.autoClose ?? globalOptions.autoClose;

    const _id = id ?? getId();

    const newToast: Toast = {
      ...info,
      cancel: () => cancel(_id),
      type: info.type,
      id: _id,
      visible: true,
      _timer: autoClose
        ? new Timer(info.options?.animationDuration ?? toastDuration, () => {
            cancel(_id);
            if (newToast._timer) {
              newToast._timer.stop();
              newToast._timer = null;
            }
          })
        : null,
    };

    updateToasts([...toasts, newToast]);

    return {
      close: () => cancel(_id),
    };
  };

  return {
    addToast,
  };
};

export { useToast };
