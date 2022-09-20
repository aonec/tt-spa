import React, { FC } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Header = styled.div`
  font-size: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const DeviceInfoWrapper = styled.div`
  margin-top: 15px;
`;

export const InfoBlockTitle = styled.div`
  color: gray;
`;

export const InfoBlockValue = styled.div`
  color: #000000dd;
  font-size: 16px;
  font-weight: 500;
  line-height: 0;
  margin-top: 10px;
`;

export const InfoBlock: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div>
      <InfoBlockTitle>{title}</InfoBlockTitle>
      <InfoBlockValue>{children}</InfoBlockValue>
    </div>
  );
};

export const InvalidReadingsInfoWrapper = styled.div`
  margin-top: 15px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 0.7fr 0.5fr 0.8fr 1.2fr 30px;
`;

export const InvalidReadingValueWrapper = styled.div`
  margin-top: 10px;
  line-height: 0;
  height: 15px;

  &:first-child {
    margin-top: 0;
  }
`;

export const InvalidReadingValueIndex = styled.span`
  color: gray;
  font-weight: 300;
`;

export const InvalidReadingValue = styled.span`
  color: red;
`;
