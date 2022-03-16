import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Flex } from '../Flex';

interface Props {
  w?: number;
  h?: number;
  line?: boolean;
}

export const Space = styled.div`
  min-width: ${({ w }: Props) => `${w || 15}px`};
  min-height: ${({ h, line }: Props) => `${(h || 15) * (line ? 2 : 1)}px`};
`;

export const SpaceLine = ({ noTop }: { noTop?: boolean }) => (
  <>
    {!noTop && <Space />}
    <Line />
    <Space />
  </>
);

const Line = styled.div`
  border-top: 2px solid #f3f3f3;
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
