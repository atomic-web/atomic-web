import { createContext, useState } from 'react';

export interface SessionInfo {
  userId?: string;
}

export interface SessionContextValue {
  session?: SessionInfo | undefined;
  fetchSession: () => Promise<SessionInfo | undefined>;
  signOut: () => Promise<void>;
  update: (info: Partial<SessionInfo>) => void;
}

export const SessionContext = createContext<SessionContextValue>({
  fetchSession: () => Promise.resolve(undefined),
  update: () => 0,
  signOut: () => Promise.resolve(undefined),
});

export interface SessionProviderProps {
  children?: React.ReactNode;
  defaultValue?: SessionInfo;
  fetchSession: () => Promise<SessionInfo>;
}

export const SessionProvider = (props: SessionProviderProps) => {
  const { defaultValue, fetchSession } = props;
  const update = (info: Partial<SessionInfo>) => {
    updateSession((oldSession) => ({
      ...oldSession,
      session: {
        ...oldSession.session,
        ...info,
      },
    }));
  };

  const signOut = () => Promise.resolve();

  const value: SessionContextValue = {
    update,
    signOut,
    fetchSession,
    session: defaultValue,
  };

  const [session, updateSession] = useState(value);

  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
};
