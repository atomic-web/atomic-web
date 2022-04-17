import { useContext } from 'react';
import { ToastContext } from '../../utils/ui-context';
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
  type ?: ToastType,
  position?: ToastPosition;
  animationDuration?: number;
  toastDuration?: number;
  pauseOnHover? : boolean,
  showProgress? : boolean
};

const useToast = (options?: ToastOptions) => {
  const { toasts, updateToasts } = useContext(ToastContext);
  const globalOptions = useToastOptions();
  const animationDuration =
    options?.animationDuration ?? globalOptions.animationDuration;
  const toastDuration = options?.toastDuration ?? globalOptions.toastDuration;

  const cancel = (id: string) => {
    updateToasts((_toasts) =>
      _toasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
    window.setTimeout(() => removeById(id), animationDuration);
  };

  const removeById = (id: string) => {
    updateToasts((_toasts) => _toasts.filter((toast) => toast.id !== id));
  };

  const addToast = (info: UseToastParams, id?: string) => {
    if (id && toasts.some((toast) => toast.id === id)) {
      throw new Error(`Toast with id ${id} already exists`);
    }

    const _id = id ?? getId();

    const newToast: Toast = {
      ...info,
      cancel: () => cancel(_id),
      type: info.type,      
      id: _id,
      visible: true,
      _timer: new Timer(toastDuration, () => {
        cancel(_id);
        if (newToast._timer) {
          newToast._timer.stop();
          newToast._timer = null;
        }
      }),
    };

    updateToasts([...toasts, newToast]);
  };

  return {
    addToast,
  };
};

export { useToast };
