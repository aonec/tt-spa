import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '../Flex';

export const Space = styled.div`
  width: 15px;
  height: 15px;
`;

interface SpaceProps {
  children: ReactNode[];
  flex?: boolean;
  spaceStyles?: React.CSSProperties;
}

export const Spaces: React.FC<SpaceProps> = ({
  children,
  flex,
  spaceStyles,
}) => {
  const content = children.map((elem, index) => (
    <React.Fragment key={index}>
      {elem}
      {index !== children.length - 1 && <Space style={spaceStyles} />}
    </React.Fragment>
  ));

  return <>{flex ? <Flex>{content}</Flex> : content}</>;
};
