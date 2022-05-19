import { isOKStatus } from '../../utils/http/is-ok-status';
import { useState } from 'react';
import { axiosInstance } from '../http';

interface AuthResponse {
  token: string;
  expires: number;
}

export interface SignInFunc {
  (
    username: string,
    password: string,
    extraInfo?: Record<string, unknown>
  ): Promise<boolean>;
  (): Promise<boolean>;
}

export type SignOutFunc = () => Promise<boolean>;

export interface UseAuthReturn {
  isAuthenticated: boolean;
  signIn: SignInFunc;
  signOut: SignOutFunc;
}

let refreshTimeout : NodeJS.Timeout;

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const setupRefresh = (expires : number)=>{
    const _24day = 24 * 24 * 60 * 60 * 1000;
    if (expires < _24day){
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(signIn,expires);
    }
  }

  const signIn: SignInFunc = async (...parameters: Parameters<SignInFunc>) => {
    try {
      let token: string | undefined;
      let expires: number;
      if (parameters.length) {
        const [username, password, extraInfo] = (parameters as unknown[]);

        const resp = await axiosInstance.post<AuthResponse>(
          process.env.NEXT_PUBLIC_SIGNIN_API_URL,
          {
            username,
            password,
            extraInfo,
          }
        );

        token = resp.data.token;
        expires = resp.data.expires;
        if (!token) {
          return false;
        }
        setupRefresh(expires);
        return true;
      }

      const refreshResp = await axiosInstance.post<AuthResponse>(
        process.env.NEXT_PUBLIC_AUTH_REFRESH_API_URL,
        null,
        {
          withCredentials : true
        }
      );
      token = refreshResp.data.token;
      expires = refreshResp.data.expires;

      if (!token) {
        return false;
      }

      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
      setAuthenticated(true);
      setupRefresh(expires);

      return true;
    } catch {
      return false;
    }
  };

  const signOut: SignOutFunc = async () => {
    const resp = await axiosInstance.post(
      process.env.NEXT_PUBLIC_SIGNOUT_API_URL
    );
    const success = isOKStatus(resp);

    if (success){
      setAuthenticated(false);
    }

    return success;
  };

  return {
    signIn,
    signOut,
    isAuthenticated,
  };
};

export { useAuth };
