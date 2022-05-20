import {jwtVerify} from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT_SECRET } from '../pages/api/auth/signin';

const verifyJwtToken = async(req: NextApiRequest) => {

  const authorization = req.headers['authorization'];

  if (!authorization || typeof authorization !== 'string') {
    return false;
  }

  const [, token] = (authorization as string).split(' ');

  if (!token) {
    return false;
  }
  const {payload} = await jwtVerify(token, JWT_SECRET);

  if (!payload) {
    return false;
  }
  return true;
};

const noneAuthPaths = ['/api/auth/signin', '/api/auth/refresh'];

export function authMiddleware(req: NextApiRequest , resp : NextApiResponse) {
  
  const pathName = req.url;
  
  if (!pathName.startsWith('/api') || noneAuthPaths.includes(pathName)) {
    return;
  }
  
  if (!verifyJwtToken(req)) {
    resp.status(401).send(null);
  }
}