import React, { FC, useMemo, useState } from 'react';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { DistrictData, ymaps } from 'types';

export const DistrictsMap: FC<Props> = ({ districtsList }) => {
  const [districtsGroup, setDistrictsGroup] =
    useState<ymaps.GeoObjectCollection | null>(null);

  const { mapRef } = useYMaps((map) => {
    const districtsGroup = new ymaps.GeoObjectCollection();

    map.geoObjects.add(districtsGroup);

    console.log(map, districtsGroup);

    setDistrictsGroup(districtsGroup);
  });

  const districtsDataList: DistrictData[] = useMemo(
    () => getPayloadFromDistricts(districtsList),
    [districtsList],
  );

  useRenderDistricts(districtsGroup, districtsDataList);

  return (
    <MapWrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
