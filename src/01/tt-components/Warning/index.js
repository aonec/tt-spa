import React from 'react';
import styled from 'styled-components';
import { cyan } from '@material-ui/core/colors';

export const StyledWarning = styled.div`
  background: rgba(255, 140, 104, 0.16);
  padding: 16px;
  position: relative;
  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: #ff8c68;
  }
  p {
    padding: 0;
    margin: 0;
  }
`;

export const Warning = ({ hidden, title, style }) => {
  // console.log('Warning');
  return (
    <StyledWarning hidden={hidden} title={title} style={style}>
      <p>{title}</p>
    </StyledWarning>
  );
};

export default Warning;
