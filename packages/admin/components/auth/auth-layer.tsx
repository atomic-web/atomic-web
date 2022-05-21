import { SessionInfo, SessionProvider } from '@atomic-web/ui-core';
import { useRouter } from 'next/router';
import { isBrowserEnv } from '../../utils/misc/is-browser-env';
import { axiosInstance } from '../http';
import noneAuthPages from './none-auth-pages';
import { useAuth } from './use-auth';

const AuthLayer = (props) => {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuth();

  if (noneAuthPages.includes(router.pathname)) {
    return props.children;
  }

  const fetchSession = async () => {
    try {
      if (!isAuthenticated) {
        const success = await signIn();

        if (!success) {
          throw new Error('Not Authorized!');
        }
      }

      const resp = await axiosInstance.get<SessionInfo>(
        process.env.NEXT_PUBLIC_SESSION_API_URL
      );

      if (!resp.data) {
        throw new Error('Not Authorized!');
      }

      return resp.data;
    } catch (ex) {
      if (isBrowserEnv()){
        router.push(process.env.NEXT_PUBLIC_LOGIN_URL);
      }
      return;
    }
  };

  if (!isAuthenticated) {
    signIn().then((success) => {
      if (!success && isBrowserEnv()) {
        router.push(process.env.NEXT_PUBLIC_LOGIN_URL);
      }
    });
    return null;
  }
  
  return (
    <SessionProvider fetchSession={fetchSession}>
      {props.children}
    </SessionProvider>
  );
};

export { AuthLayer };
