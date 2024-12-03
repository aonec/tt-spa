import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { PencilIcon } from 'ui-kit/icons';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { GoBack } from 'ui-kit/shared/GoBack';
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
import { FormType, Props } from './CreateDistrictBorderMapPage.types';
import { CreateDistrictFormPanel } from './CreateDistrictFormPanel';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { findPolygonCenter } from 'utils/findPolygonCenter';
import { MapZoomControl } from 'ui-kit/shared/MapZoomControl';
import { SearchAddresses } from './SearchAddresses/SearchAddresses';
import { BuildingWithCoordinatesResponse } from 'api/types';
import { useFormik } from 'formik';
import { DistrictColor } from 'types';

export const CreateDistrictBorderMapPage: FC<Props> = ({
  existingHousingStocks,
  existingDistricts,
  handleCreateDistrict,
  preselectedDistrictPayload,
  organizationCoordinates,
  isLoadingPostDistrict,
  setDistrictPayload,
}) => {
  const { values, setFieldValue, setValues } = useFormik<FormType>({
    initialValues: {
      isEditing: true,
      selectedHouses: [],
      name: '',
      color: DistrictColor.Blue,
      formSection: 0,
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    return setDistrictPayload.watch(({ housingStockIds }) =>
      setValues({
        ...values,
        selectedHouses: housingStockIds,
        isEditing: false,
      }),
    ).unsubscribe;
  }, [setDistrictPayload, setValues, values]);

  const { map, mapRef } = useYMaps(organizationCoordinates);
  const [searchBuilding, setSearchBuilding] =
    useState<BuildingWithCoordinatesResponse | null>(null);

  const toggleHouse = useCallback(
    (id: number) => {
      const isSelected = values.selectedHouses.includes(id);

      const newSelectedArray = isSelected
        ? values.selectedHouses.filter((elem) => elem !== id)
        : [...values.selectedHouses, id];

      setFieldValue('selectedHouses', newSelectedArray);
    },
    [values.selectedHouses, setFieldValue],
  );

  const workingDistrictArray = useMemo(
    () => getWorkingDistrict(values.isEditing, values.name, values.color),
    [values.isEditing, values.name, values.color],
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

  useEffect(() => {
    if (!preselectedDistrictPayload?.polygon || !map) return;

    const center = findPolygonCenter(preselectedDistrictPayload.polygon);

    map.setCenter(center, 15);
  }, [map, preselectedDistrictPayload]);

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

    setFieldValue(
      'selectedHouses',
      housesInDistrict.map(({ id }) => id),
    );
  }, [housesInDistrict, setFieldValue, preselectedDistrictPayload]);

  const buildingsPlacemarks = useMemo(
    () =>
      getBuildingPlacmearks(
        existingHousingStocks,
        housesInDistrict.map(({ id }) => id),
        values.selectedHouses,
        toggleHouse,
        searchBuilding && [searchBuilding.id],
      ),
    [
      existingHousingStocks,
      values.selectedHouses,
      housesInDistrict,
      searchBuilding,
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
        <SearchAddresses
          handleSelect={(building) => {
            if (!building.coordinates) return;

            const center = [
              building.coordinates.latitude,
              building.coordinates.longitude,
            ];

            setSearchBuilding(building);

            const MAP_ZOOM = 17;

            map?.setCenter(center, MAP_ZOOM, { duration: 200 });
          }}
          existingHousingStocks={existingHousingStocks}
        />
        <ControlButtonsWrapper>
          {values.isEditing && (
            <Button onClick={() => setFieldValue('isEditing', false)}>
              Создать район
            </Button>
          )}
          {!values.isEditing && (
            <Button
              onClick={() => setFieldValue('isEditing', true)}
              icon={<PencilIcon />}
            >
              Редактировать
            </Button>
          )}
        </ControlButtonsWrapper>
      </Header>
      <MapWrapper>
        {!values.isEditing && (
          <CreateDistrictFormPanel
            isLoadingCreatingDistrict={isLoadingPostDistrict}
            isLoadingHousingStocks={false}
            selectedHousingStocks={values.selectedHouses}
            housingStocksInDistrict={housesInDistrict}
            handleClickHousingStock={toggleHouse}
            handleCancel={() => setFieldValue('isEditing', true)}
            districtColor={values.color}
            formSection={values.formSection}
            handleCreateDistrict={handleCreateDistrict}
            districtName={values.name}
            setFormSection={(value) => setFieldValue('formSection', value)}
            setDistrictColor={(value) => setFieldValue('color', value)}
            setDistrictName={(value) => setFieldValue('name', value)}
            districtPolygonCoordinates={
              workingDistrict?.geometry?.getCoordinates()?.[0] || []
            }
          />
        )}
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
        {map && <MapZoomControl map={map} />}
      </MapWrapper>
    </div>
  );
};
