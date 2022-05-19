import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from './api/auth/signin';

const verifyJwtToken = (req: NextRequest) => {

  const authorization = req.headers.get('authorization');

  if (!authorization || typeof authorization !== 'string') {
    return false;
  }

  const [, token] = (authorization as string).split(' ');

  if (!token) {
    return false;
  }
  const result = jwt.verify(token, jwtSecretKey);

  if (!result) {
    return false;
  }
  return true;
};

const noneAuthPaths = ['/api/auth/signin', '/api/auth/refresh'];

export function middleware(req: NextRequest) {
  
  const pathName = req.nextUrl.pathname;
  
  if (!pathName.startsWith('/api') || noneAuthPaths.includes(pathName)) {
    return;
  }
  
  if (!verifyJwtToken(req)) {
    return new Response(null, { status: 401 });
  }
}
