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
import {
  deleteDistrictMutation,
  updateDistrictMutation,
} from '../../manageDistrictsMapService.api';
import { EditDistrictInfoModal } from './EditDistrictInfoModal';

const { outputs, inputs } = manageDistrictMapService;

export const ManageDistrictsMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
}) => {
  const {
    selectedDistrictId,
    isDeleteDistrictModalOpen,
    isEditDistictInfoModalOpen,
    selectDistrict,
    openDeleteDistrictModal,
    closeDeleteDistrictModal,
    openEditDistrictModal,
    closeEditDistrictModal,
  } = useUnit({
    selectedDistrictId: outputs.$selectedDistrict,
    isDeleteDistrictModalOpen: outputs.$isDeleteDistrictModalOpen,
    isEditDistictInfoModalOpen: outputs.$isEditDistictInfoModalOpen,
    selectDistrict: inputs.selectDistrict,
    openDeleteDistrictModal: inputs.openDeleteDistrictModal,
    closeDeleteDistrictModal: inputs.closeDeleteDistrictModal,
    openEditDistrictModal: inputs.openEditDistrictModal,
    closeEditDistrictModal: inputs.closeEditDistrictModal,
  });

  const { start: deleteDistrict, pending: isDeletingDistrictLoading } = useUnit(
    deleteDistrictMutation,
  );

  const { start: updateDistrict, pending: isUpdateDistrictLoading } = useUnit(
    updateDistrictMutation,
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
    !isDeleteDistrictModalOpen &&
    !isEditDistictInfoModalOpen;

  return (
    <>
      {isSelectDistrictModalOpen && selectedPreparedDistrict && (
        <SelectDistrictActionModal
          districtData={selectedPreparedDistrict}
          isOpen={Boolean(selectedDistrictId)}
          handleClose={() => selectDistrict(null)}
          openDeleteDistrictModal={openDeleteDistrictModal}
          openEditDistrictModal={openEditDistrictModal}
        />
      )}
      {isDeleteDistrictModalOpen && selectedPreparedDistrict && (
        <DeleteDistrictModal
          closeDeleteDistrictModal={closeDeleteDistrictModal}
          districtName={selectedPreparedDistrict.name}
          handleDeleteDistrict={() =>
            selectedPreparedDistrict.id &&
            deleteDistrict(selectedPreparedDistrict.id)
          }
          isLoading={isDeletingDistrictLoading}
        />
      )}
      {isEditDistictInfoModalOpen && selectedPreparedDistrict && (
        <EditDistrictInfoModal
          updateDistrict={updateDistrict}
          closeEditDistrictModal={closeEditDistrictModal}
          districtData={selectedPreparedDistrict}
          isLoading={isUpdateDistrictLoading}
        />
      )}
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </>
  );
};
