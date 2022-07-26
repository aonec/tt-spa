/* eslint-disable */

import React from 'react';
import styled from '@reshadow/macro';

import styles from './styles';

export const CommentsBlock = ({ url, comments, hidden, canBeCreate }) => {
  return styled(styles)(
    <comment_block>
      <h2>Комментарии</h2>
    </comment_block>
  );
};
