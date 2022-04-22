import React from 'react';
import { ToastContainer } from './toast-container';
import { Toast,ToastOptions} from './use-toast';

const TOAST_DURATION = 5000;
const ANIMATION_DURATION = 300;

export interface ToastContextParams {
  toasts: Toast[];
  updateToasts: UpdateToastFunc;
  toastOptions : Required<ToastOptions>
}

export type UpdateToastFunc = (
  value: Toast[] | ((toasts: Toast[]) => Toast[])
) => void;

const defaultValue: ToastContextParams = {
  toasts: [],
  updateToasts: (_: Toast[] | ((prev: Toast[]) => Toast[])) => 0,
  toastOptions : {
    position : 'top-right',
    animationDuration : ANIMATION_DURATION,
    autoClose : true,
    pauseOnHover : true,
    showProgress : true,
    toastDuration : TOAST_DURATION,
    type : 'info'
  }
};

export const ToastContextProvider: React.FC = ({ children }) => {
  const [toasts, updateToasts] = React.useState<Toast[]>([]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        updateToasts,
        toastOptions : defaultValue.toastOptions
      }}
    >
      <ToastContainer/>  
      {children}
    </ToastContext.Provider>
  );
};

export const ToastContext =
  React.createContext<ToastContextParams>(defaultValue);
