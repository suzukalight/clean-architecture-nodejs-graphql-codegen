import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from '../../libraries/auth0';
import { fetchFromBackend } from '../../libraries/fetch';

const SIGNIN_OR_SIGNUP_AUTH0 = `
mutation SignInOrSignUpAuth0($input: SignInOrSignUpAuth0Request) {
  signInOrSignUpAuth0(input: $input) {
    user {
      id
    }
    isNewUser
  }
}
`;

const signInOrSignUp = async (auth0UserId: string) => {
  const res = await fetchFromBackend(SIGNIN_OR_SIGNUP_AUTH0, { input: { auth0UserId } });
};

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (_req, _res, session) => {
        const auth0UserId = (session?.user?.sub || '') as string;
        await signInOrSignUp(auth0UserId);
        return { ...session };
      },
    });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).end(e.message);
  }
};

export default callback;
