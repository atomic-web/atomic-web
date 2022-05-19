import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const signout = (req: NextApiRequest, res: NextApiResponse) => {
  const requestCookie = new Cookies(
    req as unknown as IncomingMessage,
    res as unknown as ServerResponse
  );
  requestCookie.set('refresh_token' , null);
  res.end();
};

export default signout;
