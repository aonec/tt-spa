import React, { FC, useMemo, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { PencilIcon } from 'ui-kit/icons';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { useRenderDistricts, useRenderPlacemarks } from 'hooks/ymaps/utils';
import {
  ControlButtonsWrapper,
  Header,
  MapWrapper,
  Wrapper,
} from './CreateDistrictBorderMapPage.styled';
import {
  getBuildingPlacmearks,
  getWorkingDistrict,
} from './CreateDistrictBorderMapPage.utils';
import { Props } from './CreateDistrictBorderMapPage.types';

export const CreateDistrictBorderMapPage: FC<Props> = ({
  existingHousingStocks,
}) => {
  const { map, mapRef } = useYMaps();

  const [isEditing, setIsEditing] = useState(true);

  const buildingsPlacemarks = useMemo(
    () => getBuildingPlacmearks(existingHousingStocks),
    [existingHousingStocks],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  const workingDistrict = useMemo(
    () => getWorkingDistrict(isEditing),
    [isEditing],
  );

  useRenderDistricts(map, workingDistrict);

  return (
    <Wrapper>
      <Header>
        <div>
          <GoBack />
        </div>
        <ControlButtonsWrapper>
          {isEditing && (
            <Button onClick={() => setIsEditing(false)}>Создать район</Button>
          )}
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} icon={<PencilIcon />}>
              Редактировать
            </Button>
          )}
        </ControlButtonsWrapper>
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </Wrapper>
  );
};
