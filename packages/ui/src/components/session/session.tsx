import React, { useEffect, useMemo } from 'react';
import { SessionInfo } from './session-context';
import { useSession } from './use-session';

export type SessionProps<
  TRequired extends boolean | undefined,
  TFallback = TRequired extends true | undefined
    ? {
        fallback: React.ReactNode;
      }
    : {
        fallback?: React.ReactNode;
      },
  TChildren = 
      {
        children?: (session: TRequired extends true | undefined ? SessionInfo : SessionInfo | undefined) => React.ReactNode;
      }
> = {
  required?: TRequired;  
} & TFallback & TChildren;

const Session = <TReq extends boolean | undefined = undefined>(
  props: SessionProps<TReq>
) => {
  const { required = true, fallback, children } = props;
  const [session, { fetchSession, update }] = useSession();

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
    if (!session) {
      if (required) return fallback;
      return (children as (session?: SessionInfo) => React.ReactNode)?.(
        session
      );
    }
    return children?.(session);
  }, [session, required, children, fallback]);

  return <> {content} </>;
};

export { Session };
