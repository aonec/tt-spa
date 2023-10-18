import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { message } from 'antd';
import {
  deleteDistrictMutation,
  existingDistrictsQuery,
  updateDistrictMutation,
} from './manageDistrictsMapService.api';
import { currentUserService } from 'services/currentUserService';
import { DistrictsPageSegment } from './ManageDistrictPage/ManageDistrictPage.types';
import { addHouseToDistrictMutation } from './ManageDistrictPage/ManageDistrictsList/addHouseToDistrict/addHouseToDistrictService.api';
import { deleteHouseInDistrictMutation } from './ManageDistrictPage/ManageDistrictsList/deleteHouseInDistrict/deleteHouseInDistrictService.api';

const ManageDistrictsGate = createGate();

const handleDeleteDistrict = createEvent<string>();

const setDistrictsPageSegment = createEvent<DistrictsPageSegment>();

const $districtsPageSegment = createStore<DistrictsPageSegment>('list').on(
  setDistrictsPageSegment,
  (_, segment) => segment,
);

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

updateDistrictMutation.finished.success.watch(() => {
  message.success('Район успешно изменен');
});

deleteDistrictMutation.finished.failure.watch((e) =>
  message.error(e.error.response.data.error.Text),
);

sample({
  clock: [
    deleteDistrictMutation.finished.success,
    updateDistrictMutation.finished.success,
    addHouseToDistrictMutation.finished.success,
    deleteHouseInDistrictMutation.finished.success,
  ],
  target: existingDistrictsQuery.start,
});

sample({
  clock: ManageDistrictsGate.close,
  target: existingDistrictsQuery.reset,
});

export const manageDistrictsMapService = {
  inputs: {
    handleDeleteDistrict,
    setDistrictsPageSegment,
  },
  outputs: {
    $organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
    $districtsPageSegment,
  },
  gates: { ManageDistrictsGate },
};
