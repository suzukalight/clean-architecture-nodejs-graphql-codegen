import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from '../../libraries/auth0';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleLogin(req, res);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).end(e.message);
  }
};

export default login;
