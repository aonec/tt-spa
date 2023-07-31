import React, { FC, useEffect, useMemo } from 'react';
import { Header, MapWrapper } from './EditDistrictBordersMap.styled';
import { Props } from './EditDistrictBordersMap.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import {
  getPayloadFromDistrict,
  getPayloadFromDistricts,
} from 'utils/districtsData';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { findPolygonCenter } from 'utils/findPolygonCenter';

export const EditDistrictBordersMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
  districtId,
}) => {
  const { map, mapRef } = useYMaps(organizationCoordinates);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(
      existingDistricts.filter(({ id }) => id !== districtId),
    );
  }, [districtId, existingDistricts]);

  useRenderDistricts(map, preparedExistingDistricts);

  const editingDistrict = useMemo(() => {
    if (!existingDistricts) return null;

    const district = existingDistricts.find((elem) => elem.id === districtId);

    if (!district) return null;

    return getPayloadFromDistrict(district, true);
  }, [districtId, existingDistricts]);

  const editindDistrictArray = useMemo(
    () => (editingDistrict ? [editingDistrict] : []),
    [editingDistrict],
  );

  useRenderDistricts(map, editindDistrictArray);

  useEffect(() => {
    if (!editingDistrict || !map) return;

    map.setCenter(findPolygonCenter(editingDistrict.coordinates[0]));
  }, [map, editingDistrict]);

  return (
    <div>
      <Header>
        <GoBack />
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </div>
  );
};
