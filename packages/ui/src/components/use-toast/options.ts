import { Toast, ToastOptions } from './use-toast';
import { ToastContext } from './toast-context';
import { useContext } from 'react';
import { useMemo } from 'react';

export const useToastOptions = (
  toast?: Toast,
  hookOptions?: ToastOptions
): Required<ToastOptions> => {
  const { toastOptions } = useContext(ToastContext);

  const actualToastOptions: Required<ToastOptions> = useMemo(() => {
    return {
      position:
        toast?.options?.position ??
        hookOptions?.position ??
        toastOptions.position ??
        'top-right',
      animationDuration:
        toast?.options?.animationDuration ??
        hookOptions?.animationDuration ??
        toastOptions.animationDuration,
      toastDuration:
        toast?.options?.toastDuration ??
        hookOptions?.toastDuration ??
        toastOptions.toastDuration,
      type: toast?.type ?? hookOptions?.type ?? toastOptions.type,
      pauseOnHover:
        toast?.options?.pauseOnHover ??
        hookOptions?.pauseOnHover ??
        toastOptions.pauseOnHover,
      showProgress:
        toast?.options?.showProgress ??
        hookOptions?.showProgress ??
        toastOptions.showProgress ??
        true,
      autoClose:
        toast?.options?.autoClose ??
        hookOptions?.autoClose ??
        toastOptions.autoClose ??
        true,
    };
  }, [
    hookOptions?.animationDuration,
    hookOptions?.autoClose,
    hookOptions?.pauseOnHover,
    hookOptions?.position,
    hookOptions?.showProgress,
    hookOptions?.toastDuration,
    hookOptions?.type,
    toast?.options?.animationDuration,
    toast?.options?.autoClose,
    toast?.options?.pauseOnHover,
    toast?.options?.position,
    toast?.options?.showProgress,
    toast?.options?.toastDuration,
    toast?.type,
    toastOptions.animationDuration,
    toastOptions.autoClose,
    toastOptions.pauseOnHover,
    toastOptions.position,
    toastOptions.showProgress,
    toastOptions.toastDuration,
    toastOptions.type,
  ]);

  return actualToastOptions;
};
