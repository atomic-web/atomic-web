import { NextApiRequest, NextApiResponse } from 'next';
import { generateTokenPair, JWT_SECRET, setAuthCookie } from './signin';
import { jwtVerify } from 'jose';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

const verifyRefresh = async(token: string) => {
  try {
    const {payload} = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return false;
  }
};

const refresh = async(req: NextApiRequest, res: NextApiResponse) => {
  
  const requestCookie = new Cookies(
    req as unknown as IncomingMessage,
    res as unknown as ServerResponse
  );
   
  const refresh_token = requestCookie.get('refresh_token');
  
  const payload = await verifyRefresh(refresh_token) as Record<string,object>;

  if (!payload) {
    res.status(401).end();
    return;
  }
  const expiresIn = 900000;
  const [token, refreshToken] = await generateTokenPair(
    '1000',
    payload.userName as unknown as string,
    expiresIn
  );

  setAuthCookie(req, res, refreshToken);

  res.send({
    token,
    expiresIn,
  });
};

export default refresh;
