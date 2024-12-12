import React, { FC } from 'react';
import { InfoItem, PointIconSC, Wrapper } from './HeaderInfoString.styled';
import { HeaderInfoStringProps } from './HeaderInfoString.types';

export const HeaderInfoString: FC<HeaderInfoStringProps> = ({ children }) => {
  return (
    <Wrapper>
      {children.map((node, index) => (
        <InfoItem key={index}>
          {node}
          {index < children.length - 1 && <PointIconSC />}
        </InfoItem>
      ))}
    </Wrapper>
  );
};
