import * as React from 'react';
import { Nav, INavLinkGroup } from '@fluentui/react';

import styles from './index.module.scss';

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
];

export const LeftNav: React.FC = () => (
  <Nav
    className={styles.root}
    onLinkClick={() => {}}
    selectedKey="key3"
    ariaLabel="Nav basic example"
    groups={navLinkGroups}
  />
);

export default LeftNav;
