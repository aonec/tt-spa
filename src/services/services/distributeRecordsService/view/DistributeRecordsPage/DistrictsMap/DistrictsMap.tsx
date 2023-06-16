import React, { FC, useMemo } from 'react';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderDistricts, useRenderTextPlacemarks } from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { DistrictData } from 'types';
import { findPolygonCenter } from 'utils/findPolygonCenter';

export const DistrictsMap: FC<Props> = ({ districtsList }) => {
  const { mapRef, map } = useYMaps();

  const districtsDataList: DistrictData[] = useMemo(() => {
    return getPayloadFromDistricts(districtsList).map((elem) => ({
      ...elem,
      onClick: console.log,
    }));
  }, [districtsList]);

  useRenderDistricts(map, districtsDataList);

  const districtTitles = useMemo(() => {
    return getPayloadFromDistricts(districtsList).map((elem) => ({
      text: elem.name,
      coords: findPolygonCenter(elem.coordinates[0]),
    }));
  }, [districtsList]);

  useRenderTextPlacemarks(map, districtTitles);

  return (
    <MapWrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
