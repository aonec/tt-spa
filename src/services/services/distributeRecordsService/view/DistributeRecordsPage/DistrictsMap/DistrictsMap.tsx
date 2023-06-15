import React, { FC, useMemo } from 'react';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { DistrictData } from 'types';

export const DistrictsMap: FC<Props> = ({ districtsList }) => {
  const { mapRef, map } = useYMaps();

  const districtsDataList: DistrictData[] = useMemo(() => {
    return getPayloadFromDistricts(districtsList).map((elem) => ({
      ...elem,
      onClick: console.log,
    }));
  }, [districtsList]);

  useRenderDistricts(map, districtsDataList);

  return (
    <MapWrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
