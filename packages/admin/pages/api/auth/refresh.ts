import { NextApiRequest, NextApiResponse } from 'next';
import { generateTokenPair, jwtSecretKey, setAuthCookie } from './signin';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

const verifyRefresh = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    return decoded;
  } catch {
    return false;
  }
};

const refresh = (req: NextApiRequest, res: NextApiResponse) => {
  const requestCookie = new Cookies(
    req as unknown as IncomingMessage,
    res as unknown as ServerResponse
  );
  const refresh_token = requestCookie.get('refresh_token');

  const payload = verifyRefresh(refresh_token) as JwtPayload;

  if (!payload) {
    res.status(401).end();
    return;
  }
  const expiresIn = 900000;

  const [token, refreshToken] = generateTokenPair(
    '1000',
    payload.userName,
    expiresIn
  );

  setAuthCookie(req, res, refreshToken);

  res.send({
    token,
    expiresIn,
  });
};

export default refresh;
