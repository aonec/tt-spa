import { createDomain, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { message } from 'antd';
import {
  deleteDistrictMutation,
  existingDistrictsQuery,
} from './manageDistrictsMapService.api';
import { currentUserService } from 'services/currentUserService';

const domain = createDomain('manageDistrictsMapService');

const ManageDistrictsGate = createGate();

const handleOpenDeleteDistrictModal = domain.createEvent();
const handleCloseDeleteDistrictModal = domain.createEvent();

const handleDeleteDistrict = domain.createEvent();

const manageDistrictsForm = createForm({
  fields: {
    selectedDistrictId: {
      init: null as null | string,
    },
  },
});

const $isDeleteDistrictModalOpen = createStore(false)
  .on(handleOpenDeleteDistrictModal, () => true)
  .reset(
    ManageDistrictsGate.close,
    deleteDistrictMutation.finished.success,
    handleCloseDeleteDistrictModal,
  );

manageDistrictsForm.fields.selectedDistrictId.$value.reset(
  ManageDistrictsGate.close,
  deleteDistrictMutation.finished.success,
  handleCloseDeleteDistrictModal,
);

sample({
  clock: ManageDistrictsGate.open,
  target: existingDistrictsQuery.start,
});

sample({
  clock: handleDeleteDistrict,
  source: manageDistrictsForm.fields.selectedDistrictId.$value,
  filter: (id): id is string => Boolean(id),
  target: deleteDistrictMutation.start,
});

deleteDistrictMutation.finished.success.watch(() =>
  message.success('Район успешно удален'),
);

deleteDistrictMutation.finished.failure.watch((e) =>
  message.error(e.error.response.data.error.Text),
);

sample({
  clock: deleteDistrictMutation.finished.success,
  target: existingDistrictsQuery.start,
});

export const manageDistrictsMapService = {
  inputs: {
    handleOpenDeleteDistrictModal,
    handleCloseDeleteDistrictModal,
    handleDeleteDistrict,
  },
  outputs: {
    $isDeleteDistrictModalOpen,
    $organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
  },
  gates: { ManageDistrictsGate },
  forms: { manageDistrictsForm },
};
