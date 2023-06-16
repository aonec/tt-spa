import React, { FC, useMemo } from 'react';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderDistricts, useRenderTextPlacemarks } from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { DistrictData } from 'types';
import { findPolygonCenter } from 'utils/findPolygonCenter';

export const DistrictsMap: FC<Props> = ({
  districtsList,
  handleSelectDistrict,
  selectedDistrict,
}) => {
  const { mapRef, map } = useYMaps();

  const filteredDistrictsList = useMemo(() => {
    if (!selectedDistrict) return districtsList;

    return districtsList.filter((elem) => elem.id === selectedDistrict);
  }, [districtsList, selectedDistrict]);

  const districtsDataList: DistrictData[] = useMemo(() => {
    return getPayloadFromDistricts(filteredDistrictsList).map((elem) => ({
      ...elem,
      onClick: handleSelectDistrict,
    }));
  }, [filteredDistrictsList, handleSelectDistrict]);

  useRenderDistricts(map, districtsDataList);

  const districtTitles = useMemo(() => {
    if (selectedDistrict) return [];

    return getPayloadFromDistricts(filteredDistrictsList).map((elem) => ({
      text: elem.name,
      coords: findPolygonCenter(elem.coordinates[0]),
    }));
  }, [filteredDistrictsList, selectedDistrict]);

  useRenderTextPlacemarks(map, districtTitles);

  return (
    <MapWrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
