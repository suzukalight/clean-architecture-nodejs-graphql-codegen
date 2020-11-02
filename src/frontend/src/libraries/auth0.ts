import { initAuth0 } from '@auth0/nextjs-auth0';

function getEnv(environmentVariable: string, defaultValue?: string) {
  if (typeof window === 'undefined') {
    return process.env[environmentVariable];
  }

  return defaultValue || null;
}

export default initAuth0({
  clientId: getEnv('AUTH0_CLIENT_ID'),
  clientSecret: getEnv('AUTH0_CLIENT_SECRET'),
  scope: 'openid profile email',
  domain: getEnv('AUTH0_DOMAIN'),
  redirectUri: getEnv('REDIRECT_URI', 'http://localhost:3000/api/callback'),
  postLogoutRedirectUri: getEnv('POST_LOGOUT_REDIRECT_URI', 'http://localhost:3000/'),
  session: {
    cookieSecret: getEnv('SESSION_COOKIE_SECRET'),
    cookieLifetime: 7200,
    storeIdToken: false,
    storeRefreshToken: false,
    storeAccessToken: false,
  },
});
