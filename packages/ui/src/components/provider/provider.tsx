import { ToastContextProvider } from "../use-toast/toast-context"

export const UIProvider : React.FC = ({children})=>{

      
      return (
            <ToastContextProvider>
                 {children}
            </ToastContextProvider>
      )
}