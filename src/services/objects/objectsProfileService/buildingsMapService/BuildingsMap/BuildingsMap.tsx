import React, { FC, useMemo } from 'react';
import { Wrapper } from './BuildingsMap.styled';
import { Props } from './BuildingsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getBuildingPlacmearks } from 'services/settings/districtBordersService/createDistrictBorderMapService/view/CreateDistrictBorderMapPage/CreateDistrictBorderMapPage.utils';
import { useRenderPlacemarks } from 'hooks/ymaps/utils';

export const BuildingsMap: FC<Props> = ({
  isLoading,
  existingHousingStocks,
}) => {
  const { mapRef, map } = useYMaps();

  const buildingsPlacemarks = useMemo(
    () =>
      getBuildingPlacmearks(
        existingHousingStocks,
        existingHousingStocks?.items?.map(({ id }) => id) || [],
        [],
        () => {},
        true,
      ),
    [existingHousingStocks],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  return (
    <Wrapper>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </Wrapper>
  );
};
