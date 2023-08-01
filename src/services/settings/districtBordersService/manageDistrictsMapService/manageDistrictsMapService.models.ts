import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { message } from 'antd';
import {
  deleteDistrictMutation,
  existingDistrictsQuery,
} from './manageDistrictsMapService.api';
import { currentUserService } from 'services/currentUserService';

const domain = createDomain('manageDistrictsMapService');

const ManageDistrictsGate = createGate();

const handleDeleteDistrict = domain.createEvent<string>();

sample({
  clock: ManageDistrictsGate.open,
  target: existingDistrictsQuery.start,
});

sample({
  clock: handleDeleteDistrict,
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
    handleDeleteDistrict,
  },
  outputs: {
    $organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
  },
  gates: { ManageDistrictsGate },
};
