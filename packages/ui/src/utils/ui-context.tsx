import React from 'react';
import { ToastContainer } from '../components/use-toast/toast-container';
import { Toast,ToastOptions} from '../components/use-toast/use-toast';

export interface ToastContextParams {
  toasts: Toast[];
  updateToasts: UpdateToastFunc;
  toastOptions : ToastOptions
}

export type UpdateToastFunc = (
  value: Toast[] | ((toasts: Toast[]) => Toast[])
) => void;

const defaultValue: ToastContextParams = {
  toasts: [],
  updateToasts: (_: Toast[] | ((prev: Toast[]) => Toast[])) => 0,
  toastOptions : {
    position : 'top-right'
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
