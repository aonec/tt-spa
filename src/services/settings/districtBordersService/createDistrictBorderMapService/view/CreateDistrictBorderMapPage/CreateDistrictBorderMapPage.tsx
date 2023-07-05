import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Button } from 'ui-kit/Button';
import { PencilIcon } from 'ui-kit/icons';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { useRenderDistricts, useRenderPlacemarks } from 'hooks/ymaps/utils';
import {
  ControlButtonsWrapper,
  Header,
  MapWrapper,
} from './CreateDistrictBorderMapPage.styled';
import {
  getBuildingPlacmearks,
  getSelectedHouses,
  getWorkingDistrict,
} from './CreateDistrictBorderMapPage.utils';
import { Props } from './CreateDistrictBorderMapPage.types';
import { useForm } from 'effector-forms';
import { createDistrictBorderMapService } from '../../createDistrictBorderMapService.models';
import { CreateDistrictFormPanel } from './CreateDistrictFormPanel';
import { getPayloadFromDistricts } from 'utils/districtsData';

const { forms } = createDistrictBorderMapService;

export const CreateDistrictBorderMapPage: FC<Props> = ({
  existingHousingStocks,
  existingDistricts,
  handleCreateDistrict,
  preselectedDistrictPayload,
}) => {
  const { map, mapRef } = useYMaps();

  const { fields } = useForm(forms.createDistrictForm);

  const toggleHouse = useCallback(
    (id: number) => {
      const isSelected = fields.selectedHouses.value.includes(id);

      const newSelectedArray = isSelected
        ? fields.selectedHouses.value.filter((elem) => elem !== id)
        : [...fields.selectedHouses.value, id];

      fields.selectedHouses.onChange(newSelectedArray);
    },
    [fields.selectedHouses],
  );

  const workingDistrictArray = useMemo(
    () =>
      getWorkingDistrict(
        fields.isEditing.value,
        fields.name.value,
        fields.color.value,
      ),
    [fields.color.value, fields.isEditing.value, fields.name.value],
  );

  const { savedDistricts } = useRenderDistricts(map, workingDistrictArray);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts);
  }, [existingDistricts]);

  useRenderDistricts(map, preparedExistingDistricts);

  const workingDistrict = useMemo(
    () => savedDistricts['working-district'] || null,
    [savedDistricts],
  );

  useMemo(() => {
    if (!preselectedDistrictPayload || !workingDistrict) return;

    const currentCoordinates = workingDistrict.geometry?.getCoordinates();

    if (currentCoordinates?.length || currentCoordinates?.[0]?.length) return;

    workingDistrict.geometry?.setCoordinates([
      preselectedDistrictPayload.polygon,
    ]);
  }, [workingDistrict, preselectedDistrictPayload]);

  const housesInDistrict = useMemo(
    () => getSelectedHouses(workingDistrict, existingHousingStocks),
    [existingHousingStocks, workingDistrict],
  );

  useEffect(() => {
    if (preselectedDistrictPayload) return;

    fields.selectedHouses.onChange(housesInDistrict.map(({ id }) => id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [housesInDistrict]);

  const buildingsPlacemarks = useMemo(
    () =>
      getBuildingPlacmearks(
        existingHousingStocks,
        housesInDistrict.map(({ id }) => id),
        fields.selectedHouses.value,
        toggleHouse,
      ),
    [
      existingHousingStocks,
      fields.selectedHouses.value,
      housesInDistrict,
      toggleHouse,
    ],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  return (
    <div>
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
        {!fields.isEditing.value && (
          <CreateDistrictFormPanel
            isLoadingCreatingDistrict={false}
            isLoadingHousingStocks={false}
            selectedHousingStocks={fields.selectedHouses.value}
            housingStocksInDistrict={housesInDistrict}
            handleClickHousingStock={toggleHouse}
            handleCancel={() => fields.isEditing.onChange(true)}
            setDistrictColor={fields.color.onChange}
            districtColor={fields.color.value}
            formSection={fields.formSection.value}
            setFormSection={fields.formSection.onChange}
            handleCreateDistrict={handleCreateDistrict}
            districtName={fields.name.value}
            setDistrictName={fields.name.onChange}
            districtPolygonCoordinates={
              workingDistrict?.geometry?.getCoordinates()?.[0] || []
            }
          />
        )}
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </div>
  );
};
