import type { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT, JWTPayload } from 'jose';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASS = 'admin';
const STATUS_ANAUTHORIZED = 401;
export const jwtSecretKey = 'JWT_SECRET_KEY';
export const JWT_SECRET = new TextEncoder().encode(jwtSecretKey);

export const setAuthCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  const cookies = new Cookies(
    req as unknown as IncomingMessage,
    res as unknown as ServerResponse
  );

  cookies.set('refresh_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge : 60 * 60 * 24 * 31,
  });
};

export const generateTokenPair = async (
  userId: string,
  userName: string,
  expiresIn: number
) => {
  const data: JWTPayload = {
    time: Date(),
    userId,
    userName,
  };


  const token = await new SignJWT(data)
    .setExpirationTime('15m')
    .setIssuedAt()      
    .setProtectedHeader({
      alg: 'HS256',
    })
    .sign(JWT_SECRET);
  const refreshToken = await new SignJWT(data)
    .setExpirationTime('15m')
    .setIssuedAt()
    .setProtectedHeader({
      alg: 'HS256',
    })
    .sign(JWT_SECRET);

  return [token, refreshToken];
};

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  if (username !== DEFAULT_USERNAME || password !== DEFAULT_PASS) {
    res.status(STATUS_ANAUTHORIZED).end();
    return;
  }

  const expiresIn = 900000;

  const [token, refreshToken] = await generateTokenPair(
    '1000',
    username,
    expiresIn
  );

  setAuthCookie(req, res, refreshToken);

  res.send({
    token,
    expired: expiresIn,
  });
};

export default signin;
