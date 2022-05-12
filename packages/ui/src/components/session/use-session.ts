import { useContext } from 'react';
import {
  SessionContext,
  SessionContextValue,
  SessionInfo,
} from './session-context';

export type SessionActions = Omit<SessionContextValue, 'session'>;

export type UseSessionReturn = [SessionInfo | undefined, SessionActions];

export const useSession = (): UseSessionReturn => {
  const { session, signOut, update, fetchSession } = useContext(SessionContext);

  return [session, { signOut, update, fetchSession }];
};
