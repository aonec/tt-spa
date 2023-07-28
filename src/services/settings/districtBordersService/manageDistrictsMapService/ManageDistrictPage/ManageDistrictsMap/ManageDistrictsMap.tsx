import React, { FC, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { DistrictColorsList } from 'dictionaries';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { MapWrapper } from './ManageDistrictsMap.styled';
import { Props } from './ManageDistrictsMap.types';
import { SelectDistrictActionModal } from './SelectDistrictActionModal';
import { manageDistrictMapService } from './ManageDistricsMap.model';
import { DeleteDistrictModal } from './DeleteDistrictModal';
import { deleteDistrictMutation } from '../../manageDistrictsMapService.api';

const { outputs, inputs } = manageDistrictMapService;

export const ManageDistrictsMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
}) => {
  const {
    selectedDistrictId,
    selectDistrict,
    isDeleteDistrictModalOpen,
    openDeleteDistrictModal,
    closeDeleteDistrictModal,
  } = useUnit({
    selectedDistrictId: outputs.$selectedDistrict,
    isDeleteDistrictModalOpen: outputs.$isDeleteDistrictModalOpen,
    selectDistrict: inputs.selectDistrict,
    openDeleteDistrictModal: inputs.openDeleteDistrictModal,
    closeDeleteDistrictModal: inputs.closeDeleteDistrictModal,
  });

  const { start: deleteDistrict, pending: isDeletingDistrictLoading } = useUnit(
    deleteDistrictMutation,
  );

  const { map, mapRef } = useYMaps(organizationCoordinates);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts).map((elem) => ({
      ...elem,
      onClick: () => selectDistrict(elem.id),
    }));
  }, [existingDistricts, selectDistrict]);

  useRenderDistricts(map, preparedExistingDistricts);

  const selectedPreparedDistrict = useMemo(() => {
    if (!selectedDistrictId) return null;

    return (
      preparedExistingDistricts.find(({ id }) => id === selectedDistrictId) ||
      null
    );
  }, [selectedDistrictId, preparedExistingDistricts]);

  const selectedDistrictColors = useMemo(() => {
    if (!selectedPreparedDistrict) return null;

    return (
      DistrictColorsList.find(
        (elem) => elem.type === selectedPreparedDistrict.type,
      ) || null
    );
  }, [selectedPreparedDistrict]);

  const isSelectDistrictModalOpen =
    selectedPreparedDistrict &&
    selectedDistrictColors &&
    !isDeleteDistrictModalOpen;

  return (
    <>
      {isSelectDistrictModalOpen && (
        <SelectDistrictActionModal
          strokeColor={selectedDistrictColors.strokeColor}
          fillColor={selectedDistrictColors.color}
          isOpen={Boolean(selectedDistrictId)}
          districtName={selectedPreparedDistrict.name}
          handleClose={() => selectDistrict(null)}
          openDeleteDistrictModal={openDeleteDistrictModal}
        />
      )}
      {isDeleteDistrictModalOpen && (
        <DeleteDistrictModal
          closeDeleteDistrictModal={closeDeleteDistrictModal}
          districtName={selectedPreparedDistrict?.name || ''}
          handleDeleteDistrict={() =>
            selectedPreparedDistrict?.id &&
            deleteDistrict(selectedPreparedDistrict?.id)
          }
          isLoading={isDeletingDistrictLoading}
        />
      )}
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </>
  );
};
