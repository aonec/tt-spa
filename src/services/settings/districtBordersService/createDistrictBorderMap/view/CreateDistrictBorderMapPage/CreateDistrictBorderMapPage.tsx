import React, { FC, useEffect, useMemo } from 'react';
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
  getSelectedHouseIds,
  getWorkingDistrict,
} from './CreateDistrictBorderMapPage.utils';
import { Props } from './CreateDistrictBorderMapPage.types';
import { useForm } from 'effector-forms';
import { createDistrictBorderMapService } from '../../createDistrictBorderMapService.models';

const { forms } = createDistrictBorderMapService;

export const CreateDistrictBorderMapPage: FC<Props> = ({
  existingHousingStocks,
  handleCreateDistrict,
}) => {
  const { map, mapRef } = useYMaps();

  const { fields } = useForm(forms.createDistrictForm);

  const workingDistrictArray = useMemo(
    () => getWorkingDistrict(fields.isEditing.value),
    [fields.isEditing.value],
  );

  const { savedDistricts } = useRenderDistricts(map, workingDistrictArray);

  const workingDistrict = useMemo(
    () => savedDistricts['working-district'] || null,
    [savedDistricts],
  );

  useEffect(() => {
    fields.selectedHouses.onChange(
      getSelectedHouseIds(workingDistrict, existingHousingStocks),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingHousingStocks, workingDistrict]);

  const buildingsPlacemarks = useMemo(
    () =>
      getBuildingPlacmearks(existingHousingStocks, fields.selectedHouses.value),
    [existingHousingStocks, fields.selectedHouses.value],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  return (
    <Wrapper>
      <Header>
        <div>
          <GoBack />
        </div>
        <ControlButtonsWrapper>
          {fields.isEditing.value && (
            <Button onClick={() => fields.isEditing.onChange(false)}>
              Создать район
            </Button>
          )}
          {!fields.isEditing.value && (
            <Button
              onClick={() => fields.isEditing.onChange(true)}
              icon={<PencilIcon />}
            >
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
