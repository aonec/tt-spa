import React, { ReactNode } from 'react';
import styled from 'styled-components';

export const Space = styled.div`
  width: 15px;
  height: 15px;
`;

interface SpaceProps {
  children: ReactNode[];
}

export const Spaces: React.FC<SpaceProps> = ({ children }) => {
  return (
    <>
      {children.map((elem, index) => (
        <React.Fragment key={index}>
          {elem}
          {index !== children.length - 1 && <Space />}
        </React.Fragment>
      ))}
    </>
  );
};
