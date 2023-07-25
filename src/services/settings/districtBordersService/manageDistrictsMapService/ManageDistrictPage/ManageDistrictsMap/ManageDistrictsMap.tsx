import React, { FC, useMemo, useState } from 'react';
import { MapWrapper } from './ManageDistrictsMap.styled';
import { Props } from './ManageDistrictsMap.types';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';

export const ManageDistrictsMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
}) => {
  const [, setSelectedDistrictId] = useState<string | null>(null);

  const { map, mapRef } = useYMaps(organizationCoordinates);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts).map((elem) => ({
      ...elem,
      onClick: () => setSelectedDistrictId(elem.id),
    }));
  }, [existingDistricts, setSelectedDistrictId]);

  useRenderDistricts(map, preparedExistingDistricts);

  return (
    <MapWrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
