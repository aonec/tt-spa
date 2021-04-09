import React from 'react';
import styled from 'styled-components';

interface WarningInterface {
  hidden?: boolean;
  title?: string;
  style?: any;
}

const Warning = ({ hidden, title, style }: WarningInterface) => {
  return (
    <StyledWarning hidden={hidden}>
      <p>{title}</p>
    </StyledWarning>
  );
};

export default Warning;

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
