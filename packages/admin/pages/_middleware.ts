import { NextRequest } from 'next/server';
import {jwtVerify} from 'jose';
import { JWT_SECRET } from './api/auth/signin';

const verifyJwtToken = async(req: NextRequest) => {

  const authorization = req.headers.get('authorization');

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

export function middleware(req: NextRequest) {
  
  const pathName = req.nextUrl.pathname;
  
  if (!pathName.startsWith('/api') || noneAuthPaths.includes(pathName)) {
    return;
  }
  
  if (!verifyJwtToken(req)) {
    return new Response(null, { status: 401 });
  }
}
