import { useContext } from 'react';
import { UIContext, UIContextProvider, UIContextValue } from './ui-context';

export type UseApplicationReturn = UIContextValue;

export interface ApplicationProviderProps {
  childre: React.ReactChild;
}

const ApplicationProvider = (props) => {
  const { children } = props;
  return <UIContextProvider>{children}</UIContextProvider>;
};

const useApplication = (): UseApplicationReturn => {
  const uiContext = useContext(UIContext);

  return {
    ...uiContext,
  };
};

export { ApplicationProvider, useApplication };
