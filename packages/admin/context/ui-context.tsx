import { createContext, useState } from 'react';

export type SideBarState = 'min' | 'max';

export interface UIContextValue {
  toggleSideBar: () => void;
  sideBarState: SideBarState;
}

const defaultUIContext: UIContextValue = {
  toggleSideBar: () => 0,
  sideBarState: 'max',
};

const UIContext = createContext<UIContextValue>(defaultUIContext);

export interface UIContextProipviderProps {
  children: React.ReactChild;
}

const UIContextProvider = (props) => {
  const { children } = props;
  const [sideBarState, updateSideBarState] = useState<SideBarState>(
    defaultUIContext.sideBarState
  );

  const toggleSideBar = () => {
    updateSideBarState((currentState) =>
      currentState === 'max' ? 'min' : 'max'
    );
  };

  return (
    <UIContext.Provider value={{ toggleSideBar, sideBarState }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIContext, UIContextProvider };
