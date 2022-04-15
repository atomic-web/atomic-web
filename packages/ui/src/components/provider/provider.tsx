import { ToastContextProvider } from "../../utils/ui-context"

export const UIProvider : React.FC = ({children})=>{

      
      return (
            <ToastContextProvider>
                 {children}
            </ToastContextProvider>
      )
}