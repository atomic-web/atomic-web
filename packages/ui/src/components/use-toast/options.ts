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
      pauseOnHover:
        toast?.options?.pauseOnHover ?? toastOptions.pauseOnHover ?? true,
      showProgress:
        toast?.options?.showProgress ?? toastOptions.showProgress ?? true,
    };
  }, [
    toast?.options?.pauseOnHover,
    toast?.options?.position,
    toast?.options?.showProgress,
    toast?.type,
    toastOptions.animationDuration,
    toastOptions.pauseOnHover,
    toastOptions.position,
    toastOptions.showProgress,
    toastOptions.toastDuration,
    toastOptions.type,
  ]);

  return actualToastOptions;
};
