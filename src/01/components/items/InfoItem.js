/* eslint-disable */

import React from 'react';
import t from 'prop-types';

import { LinkWrap } from '01/components/LinkWrap';

export const InfoItem = React.memo(({ title, text, url }) => (
  <info_item>
    <LinkWrap to={url}>
      <span>{title}</span>
      <span>{text}</span>
    </LinkWrap>
  </info_item>
));

InfoItem.propTypes = {
  title: t.string.isRequired,
  text: t.oneOfType([t.string, t.number]).isRequired,
  url: t.string,
};
