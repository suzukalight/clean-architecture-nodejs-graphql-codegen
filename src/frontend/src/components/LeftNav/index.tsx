import * as React from 'react';
import { Nav, INavLinkGroup, Stack, Persona, Separator } from '@fluentui/react';

import styles from './index.module.scss';

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
        url: '/signOut',
        key: 'signout',
        icon: 'SignOut',
      },
    ],
  },
];

export const LeftNav: React.FC = () => (
  <Stack className={styles.root}>
    <Persona imageInitials="MK" text="Masahiko Kubara" secondaryText="Engineer" />
    <Separator />
    <Nav selectedKey="key3" ariaLabel="Nav basic example" groups={navLinkGroups} />
    <Separator />
  </Stack>
);

export default LeftNav;
