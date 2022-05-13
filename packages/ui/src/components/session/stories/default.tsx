import { Box } from 'grommet';
import { Session } from '../session';
import { SessionInfo, SessionProvider } from '../session-context';

export default {
  title: 'Application/Session/Default',
};

const ComponentWithSessionInfo = () => {
  return (
    <Session fallback={<Box>Loading ...</Box>}>
      {(session) => <Box>UserId : {session.userId}</Box>}
    </Session>
  );
};

export const Default = () => {
  const fetchSession = () => {
    return new Promise<SessionInfo>((res) => {
      setTimeout(() => {
        res({
          userId: 'TestUser',
        });
      }, 1000);
    });
  };

  return (
    <SessionProvider fetchSession={fetchSession}>
      <ComponentWithSessionInfo />
    </SessionProvider>
  );
};
