import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from '../../libraries/auth0';

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleCallback(req, res);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).end(e.message);
  }
};

export default callback;
