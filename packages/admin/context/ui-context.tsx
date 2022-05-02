import { createContext, useState } from 'react';

export type SideBarState = 'min' | 'max';
export type ThemeMode = 'dark' | 'light';

export interface UIContextValue {
  toggleSideBar: () => void;
  sideBarState: SideBarState;
  toggleThemeDir: () => void;
  themeDir?: 'rtl' | undefined;
  setThemeMode: (mode: ThemeMode) => void;
  themeMode?: ThemeMode;
}

const defaultUIContext: UIContextValue = {
  toggleSideBar: () => 0,
  toggleThemeDir: () => 0,
  sideBarState: 'max',
  themeMode: 'light',
  setThemeMode: () => 0,
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

  const [themeDir, setThemeDir] = useState<'rtl' | undefined>();
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    defaultUIContext.themeMode
  );

  const toggleSideBar = () => {
    updateSideBarState((currentState) =>
      currentState === 'max' ? 'min' : 'max'
    );
  };

  const toggleThemeDir = () => {
    setThemeDir((dir) => (!dir ? 'rtl' : undefined));
  };

  return (
    <UIContext.Provider
      value={{
        toggleSideBar,
        sideBarState,
        themeDir,
        toggleThemeDir,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export { UIContext, UIContextProvider };
