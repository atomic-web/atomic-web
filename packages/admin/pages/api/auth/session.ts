import { NextApiRequest, NextApiResponse } from 'next';

const session = (req: NextApiRequest, res: NextApiResponse) => {
  const data: unknown = {
    userId: 1000,
  };

  res.send(data);
};

export default session;
