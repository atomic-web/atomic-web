import { useContext } from 'react';
import {
  SessionContext,
  SessionContextValue,
  SessionInfo,
} from './session-context';

export type SessionActions = Omit<SessionContextValue, 'session'>;

export interface UseSessionOptions {}
export type UseSessionReturn = [SessionInfo, SessionActions];

export const useSession = (options: UseSessionOptions): UseSessionReturn => {
  const { session, signOut, update, fetchSession } = useContext(SessionContext);

  return [session, { signOut, update, fetchSession }];
};
