import React, { FC } from 'react';
import { SearchIcon } from 'ui-kit/icons';
import { InputSC } from '01/shared/ui/Fields';
import { Wrapper } from './MapPanel.styled';
import { MapPanelProps } from './MapPanel.types';

export const MapPanel: FC<MapPanelProps> = ({}) => {
  return (
    <Wrapper>
      <InputSC prefix={<SearchIcon />} placeholder="Введите адрес" />
    </Wrapper>
  );
};
