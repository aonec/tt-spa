/* eslint-disable */

import styled, { css } from 'styled-components';

export const EditButton = styled.button`
  border: 1px solid #dcdee4;
  box-sizing: border-box;
  border-radius: 4px;
  width: 48px;
  height: 48px;
  color: #272f5a;

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;
