import { getResourceColor } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { EResourceType } from '../../api/types';
import React, { FC } from 'react';
import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  font-size: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export interface InfoBlockData {
  title: string;
  color?: string;
}

export const InfoBlockTitle = styled.div`
  color: gray;
`;

export const InfoBlockValue = styled.div`
  color: #000000dd;
  font-size: 16px;
  font-weight: 500;
`;

export const InfoBlock: FC<InfoBlockData> = ({ title, children, color }) => {
  return (
    <div>
      <InfoBlockTitle>{title}</InfoBlockTitle>
      <InfoBlockValue style={{ color }}>{children}</InfoBlockValue>
    </div>
  );
};

export const ReadingInputStyled = styled.input<{
  resource: EResourceType;
  index?: number;
}>`
  border: 1px solid
    ${({ resource, index }) => getResourceColor(resource, index)};
  border-left: 4px solid
    ${({ resource, index }) => getResourceColor(resource, index)};
  border-radius: 4px;
  padding: 4px 10px;
  width: 180px;
  transition: 0.2s;

  &:disabled {
    background: rgba(0, 0, 0, 0.08);
  }

  &:focus,
  &:hover {
    box-shadow: 0 5px 10px #00001522;
  }
`;
