import React, { FC, useMemo } from 'react';
import { MapWrapper } from './ManageDistrictsMap.styled';
import { Props } from './ManageDistrictsMap.types';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';

export const ManageDistrictsMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
  setSelectedDistrictId,
  selectedDistrictId,
}) => {
  const { map, mapRef } = useYMaps(organizationCoordinates);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts).map((elem) => ({
      ...elem,
      onClick: () => setSelectedDistrictId(elem.id),
    }));
  }, [existingDistricts, setSelectedDistrictId]);

  const mapDistricts = useMemo(() => {
    if (!selectedDistrictId) {
      return preparedExistingDistricts;
    }

    return preparedExistingDistricts.filter(
      (elem) => elem.id === selectedDistrictId,
    );
  }, [preparedExistingDistricts, selectedDistrictId]);

  useRenderDistricts(map, mapDistricts);

  return (
    <MapWrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
