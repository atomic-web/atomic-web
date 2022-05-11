import { ReactNode, useEffect, useMemo } from 'react';
import { SessionInfo } from './session-context';
import { useSession } from './use-session';

export type SessionProps = {
  children?: (session: SessionInfo) => ReactNode;
} & (
  | {
      required?: true | undefined;
      fallback: React.ReactNode;
    }
  | {
      required?: false | undefined;
      fallback?: React.ReactNode;
    }
);

const Session: React.FC<SessionProps> = (props) => {
  const { required = true, fallback, children } = props;
  const [session, { fetchSession, update }] = useSession({});

  useEffect(() => {
    if (!session) {
      fetchSession().then((newSession) => {
        if (newSession) {
          update(newSession);
        }
      });
    }
  }, [fetchSession, session, update]);

  const content = useMemo(() => {
    if (!session && required) {
      return fallback;
    }
    return children?.(session);
  }, [session, required, children, fallback]);

  return <> {content} </>;
};

export { Session };
