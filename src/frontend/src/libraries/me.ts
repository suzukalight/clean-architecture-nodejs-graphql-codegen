import { NextApiRequest } from 'next';

import auth0 from './auth0';
import { fetchFromBackend } from './fetch';

const GET_ME = `
query User ($id: ID!) {
  user(id: $id) {
    id
    roles
  }
}
`;

export const getMe = async (req: NextApiRequest) => {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    return null;
  }

  const res = await fetchFromBackend(GET_ME, {});

  const json = await res.json();
  if (json?.errors) throw new Error(json.errors.toString());

  return json;
};
