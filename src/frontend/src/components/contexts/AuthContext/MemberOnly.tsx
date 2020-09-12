import React, { FC, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';

import { getToken, AUTH_TOKEN_EVENT } from '../../../libraries/auth-token';
import { AuthContext } from '.';

const MemberOnly: FC = ({ children }) => {
  const router = useRouter();
  const { actor } = useContext(AuthContext);

  const redirectToLogin = useCallback(() => {
    const token = getToken();
    if (!token) {
      router.replace(`/login`);
    }
  }, [router]);

  useEffect(() => {
    redirectToLogin();

    document.addEventListener(AUTH_TOKEN_EVENT, () => redirectToLogin());

    return document.removeEventListener(AUTH_TOKEN_EVENT, () => {
      // nothing to do
    });
  }, []);

  return <>{actor ? children : null}</>;
};

export default MemberOnly;
