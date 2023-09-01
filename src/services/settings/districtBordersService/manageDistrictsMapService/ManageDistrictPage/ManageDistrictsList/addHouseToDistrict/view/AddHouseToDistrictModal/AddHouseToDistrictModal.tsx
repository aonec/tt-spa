import React, { FC, useMemo } from 'react';
import { Props } from './AddHouseToDistrictModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { MapWrapper } from './AddHouseToDistrictModal.styled';
import { useRenderDistricts } from 'hooks/ymaps/utils';

export const AddHouseToDistrictModal: FC<Props> = ({
  isOpen,
  closeAddHouseModal,
  organizationCoordinates,
  openedDistrict,
}) => {
  const { mapRef, map } = useYMaps(organizationCoordinates);

  const districtData = useMemo(
    () => (openedDistrict ? [openedDistrict] : []),
    [openedDistrict],
  );

  useRenderDistricts(map, districtData);

  return (
    <FormModal
      title="Добавить дом"
      formId="add-house-to-district-form"
      form={
        <>
          <AddressSearchContainer
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
            ]}
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
