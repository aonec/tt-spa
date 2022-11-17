import React, { FC, useState } from 'react';
import { Map, Placemark } from '@pbe/react-yandex-maps';
import { MapPanel } from './MapPanel';
import { PanelWrapper, Wrapper } from './ObjectsMaps.styled';
import { ObjectsMapsProps } from './ObjectsMaps.types';
import { activeMark } from './assets/activeMark';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

export const ObjectsMaps: FC<ObjectsMapsProps> = ({
  streetsData,
  handleClickHousingStock,
  housingStock,
  isLoadingHousingStock,
  clearHosuingStock,
}) => {
  const pos = [55.63844, 51.820907];

  const [
    template,
    setTemplate,
  ] = useState<ymaps.IClassConstructor<ymaps.layout.templateBased.Base> | null>(
    null
  );

  const onLoad = (ymaps: YMapsApi) => {
    if (!ymaps) return;

    const temp = ymaps.templateLayoutFactory?.createClass(activeMark);

    console.log(temp);

    setTemplate(temp);
  };

  return (
    <Wrapper>
      <Map
        onLoad={(ymaps) => onLoad(ymaps)}
        defaultState={{
          center: [55.62, 51.81],
          zoom: 15,
        }}
        width={window.screen.width - 210}
        height={window.screen.height - 195}
        state={housingStock ? { center: pos, zoom: 18 } : undefined}
      >
        <Placemark defaultGeometry={pos} />

        {template && (
          <Placemark
            key={'dsad-213213'}
            geometry={pos}
            options={
              template
                ? {
                    iconLayout: '#default#image',
                    iconContentLayout: template,
                    iconContentSize: [100, 100],
                    iconContentOffset: [10, 10],
                  }
                : undefined
            }
          />
        )}
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
