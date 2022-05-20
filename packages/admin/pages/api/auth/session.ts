import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../server/auth-middleware';

const session = (req: NextApiRequest, res: NextApiResponse) => {

  authMiddleware(req,res);

  const data: unknown = {
    userId: 1000,
  };

  res.send(data);
};

export default session;
