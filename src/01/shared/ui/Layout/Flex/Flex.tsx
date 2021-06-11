import React from 'react';
import styled from 'styled-components';

interface Props {}

export const Flex: React.FC<Props> = ({ children }) => {
  const Component = styled.div`
    display: flex;
  `;

  return <Component>{children}</Component>;
};
