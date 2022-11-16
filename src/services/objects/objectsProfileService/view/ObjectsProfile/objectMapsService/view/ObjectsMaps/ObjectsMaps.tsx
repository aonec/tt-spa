import React, { FC } from 'react';
import { Map } from 'react-yandex-maps';
import { MapPanel } from './MapPanel';
import { PanelWrapper, Wrapper } from './ObjectsMaps.styled';
import { ObjectsMapsProps } from './ObjectsMaps.types';

export const ObjectsMaps: FC<ObjectsMapsProps> = ({ streetsData }) => {
  return (
    <Wrapper>
      <Map
        defaultState={{ center: [55.63, 51.82], zoom: 15 }}
        width={window.screen.width - 210}
        height={window.screen.height - 195}
      />
      <PanelWrapper>
        <MapPanel streetsData={streetsData} />
      </PanelWrapper>
    </Wrapper>
  );
};
