import React, { FC, useMemo } from 'react';
import { Header, MapWrapper } from './EditDistrictBordersMap.styled';
import { Props } from './EditDistrictBordersMap.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { useRenderDistricts } from 'hooks/ymaps/utils';

export const EditDistrictBordersMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
}) => {
  const { map, mapRef } = useYMaps(organizationCoordinates);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts);
  }, [existingDistricts]);

  useRenderDistricts(map, preparedExistingDistricts);

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
