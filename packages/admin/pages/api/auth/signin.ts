import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASS = 'admin';
const STATUS_ANAUTHORIZED = 401;
export const jwtSecretKey = 'JWT_SECRET_KEY';

export const setAuthCookie = (req: NextApiRequest, res: NextApiResponse, token: string) => {
  const cookies = new Cookies(req as unknown as IncomingMessage, res as unknown as ServerResponse);

  cookies.set('refresh_token', token, {
    httpOnly: true,
    sameSite: 'lax',
  });
};

export const generateTokenPair = (
  userId: string,
  userName: string,
  expiresIn: number
) => {
  const data: object = {
    time: Date(),
    userId,
    userName,
  };

  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn,
  });
  const refreshToken = jwt.sign(data, jwtSecretKey, {
    expiresIn,
  });

  return [token, refreshToken];
};

const signin = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  if (username !== DEFAULT_USERNAME || password !== DEFAULT_PASS) {
    res.status(STATUS_ANAUTHORIZED).end();
    return;
  }

  const expiresIn = 900000;

  const [token, refreshToken] = generateTokenPair('1000', username, expiresIn);

  setAuthCookie(req,res,refreshToken);

  res.send({
    token,
    expired: expiresIn,
  });
};

export default signin;
