import React, { useContext, useCallback } from 'react';
import { Nav, INavLinkGroup, Stack, Persona, Separator } from '@fluentui/react';
import { useRouter } from 'next/router';

import { AuthContext } from '../contexts/AuthContext';

import styles from './index.module.scss';

export const LeftNav: React.FC = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const onClickLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout]);

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'All Todos',
          url: '?q=all',
          key: 'alltodos',
          icon: 'AllApps',
        },
        {
          name: 'Favorites',
          url: '?q=favorites',
          key: 'favorites',
          icon: 'FavoriteStar',
        },
        {
          name: 'Deadlines',
          url: '?q=deadlines',
          key: 'deadlines',
          icon: 'AlertSolid',
        },
        {
          name: 'SignOut',
          url: '#',
          key: 'signout',
          icon: 'SignOut',
          onClick: () => onClickLogout(),
        },
      ],
    },
  ];

  return (
    <Stack className={styles.root}>
      <Persona imageInitials="MK" text="Masahiko Kubara" secondaryText="Engineer" />
      <Separator />
      <Nav selectedKey="key3" ariaLabel="Nav basic example" groups={navLinkGroups} />
      <Separator />
    </Stack>
  );
};

export default LeftNav;
