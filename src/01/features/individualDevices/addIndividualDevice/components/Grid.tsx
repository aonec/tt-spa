import React from 'react';
import styled from 'styled-components';

export const Grid: React.FC = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  max-width: 960px;
  display: grid;
  grid-template-columns: 4fr 1.5fr;
`;
