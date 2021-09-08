import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '../Flex';

interface Props {
  w?: number;
  h?: number;
}

export const Space = styled.div`
  min-width: ${({ w }: Props) => `${w || 15}px`};
  min-height: ${({ h }: Props) => `${h || 15}px`};
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
  const content = children.filter(Boolean).map((elem, index) => (
    <React.Fragment key={index}>
      {elem}
      {index !== children.length - 1 && <Space style={spaceStyles} />}
    </React.Fragment>
  ));

  return <>{flex ? <Flex>{content}</Flex> : content}</>;
};
