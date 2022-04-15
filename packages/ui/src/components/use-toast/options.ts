import { Toast, ToastOptions } from './use-toast';
import { ToastContext } from './../../utils/ui-context';
import { useContext } from 'react';
import { useMemo } from 'react';

const TOAST_DURATION = 5000;

export const useToastOptions = (toast?: Toast): Required<ToastOptions> => {
  const { toastOptions } = useContext(ToastContext);

  const actualToastOptions: Required<ToastOptions> = useMemo(() => {
    return {
      position:
        toast?.options?.position ?? toastOptions.position ?? 'top-right',
      animationDuration: toastOptions.animationDuration || 300,
      toastDuration: toastOptions.toastDuration || TOAST_DURATION,
      type: toast?.type ?? toastOptions.type ?? 'info',
    };
  }, [
    toast?.options?.position,
    toast?.type,
    toastOptions.animationDuration,
    toastOptions.position,
    toastOptions.toastDuration,
    toastOptions.type,
  ]);

  return actualToastOptions;
};
