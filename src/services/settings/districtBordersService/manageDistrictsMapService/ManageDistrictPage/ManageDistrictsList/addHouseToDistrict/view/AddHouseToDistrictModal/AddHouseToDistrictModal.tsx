import React, { FC, useEffect, useMemo } from 'react';
import { Props } from './AddHouseToDistrictModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { MapWrapper } from './AddHouseToDistrictModal.styled';
import { useRenderDistricts, useRenderPlacemarks } from 'hooks/ymaps/utils';
import { getHousesPlacmearks } from 'services/settings/districtBordersService/createDistrictBorderMapService/view/CreateDistrictBorderMapPage/CreateDistrictBorderMapPage.utils';

export const AddHouseToDistrictModal: FC<Props> = ({
  isOpen,
  closeAddHouseModal,
  organizationCoordinates,
  openedDistrict,
  house,
  hasError,
  handleSearchHouse,
  isLoading,
  addHouse,
}) => {
  const { mapRef, map } = useYMaps(organizationCoordinates);

  const districtData = useMemo(
    () => (openedDistrict ? [openedDistrict] : []),
    [openedDistrict],
  );

  useRenderDistricts(map, districtData);

  const buildingPlacemark = useMemo(() => {
    if (!house) {
      return [];
    }

    return getHousesPlacmearks([house], [house.id], [], () => {});
  }, [house]);

  useRenderPlacemarks(map, buildingPlacemark);

  useEffect(() => {
    if (!house?.coordinates) return;

    map?.setCenter(
      [house.coordinates.latitude, house.coordinates.longitude],
      undefined,
      { duration: 200 },
    );
  }, [house, map]);

  return (
    <FormModal
      title="Добавить дом"
      formId="add-house-to-district-form"
      disabled={!house}
      loading={isLoading}
      onSubmit={() => {
        if (!openedDistrict?.id || !house?.id) return;

        addHouse({
          districtId: openedDistrict.id,
          data: house.id,
        });
      }}
      form={
        <>
          <AddressSearchContainer
            handleSubmit={(data) => {
              if (!data.city || !data.street || !data.house) {
                return;
              }

              handleSearchHouse({
                City: data.city,
                Street: data.street,
                BuildingNumber: data.house,
                Corpus: data.corpus,
              });
            }}
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
            ]}
            isError={hasError}
          />
          <MapWrapper>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
          </MapWrapper>
        </>
      }
      visible={isOpen}
      onCancel={closeAddHouseModal}
    />
  );
};
