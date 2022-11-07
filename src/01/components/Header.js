/* eslint-disable */

import React from 'react';

export const Header = ({
  styles,
  page,
  title = 'Заголовок',
  loading = false,
}) => {
  if (loading) return <header>loaing</header>;

  switch (page) {
    case 'tasks':
      return 'tasks';

    default:
      return styled(styles)(
        <header>
          <h1>{title}</h1>
        </header>
      );
  }
};

Header.defaultProps = {
  styles: {},
};
