import React, { FC } from 'react';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { MapPanel } from './MapPanel';
import { PanelWrapper, Wrapper } from './ObjectsMaps.styled';
import { ObjectsMapsProps } from './ObjectsMaps.types';
import activeMark from "./assets/activeMark.svg"

export const ObjectsMaps: FC<ObjectsMapsProps> = ({
  streetsData,
  handleClickHousingStock,
  housingStock,
  isLoadingHousingStock,
  clearHosuingStock,
}) => {
  const pos = [55.63844, 51.820907];

  return (
    <Wrapper>
      <Map
        defaultState={{
          center: [55.62, 51.81],
          zoom: 15,
        }}
        width={window.screen.width - 210}
        height={window.screen.height - 195}
        state={housingStock ? { center: pos, zoom: 18 } : undefined}
      >
        <Placemark
          defaultGeometry={pos}
          options={{
            iconLayout: 'default#image',
            iconImageHref: activeMark,
            iconImageSize: [52, 52],
          }}
        />
      </Map>
      <PanelWrapper>
        <MapPanel
          housingStock={housingStock}
          isLoadingHousingStock={isLoadingHousingStock}
          streetsData={streetsData}
          handleClickHousingStock={handleClickHousingStock}
          clearHosuingStock={clearHosuingStock}
        />
      </PanelWrapper>
    </Wrapper>
  );
};
