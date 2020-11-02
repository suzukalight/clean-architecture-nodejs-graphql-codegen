import { GetServerSideProps } from 'next';

import auth0 from '../libraries/auth0';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(307, { Location: '/api/login' });
    res.end();
    return { props: {} };
  }

  return { props: { user: session.user } };
};

export const Index: React.FC = () => <></>;

export const IndexPage: React.FC = () => {
  // const { actor } = useActor();
  return <Index />;
};

export default Index;
