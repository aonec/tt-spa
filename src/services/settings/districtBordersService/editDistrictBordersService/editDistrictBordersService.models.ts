import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  addHouseToDistrictMutation,
  deleteHouseInDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './editDistrictBordersService.api';
import { message } from 'antd';
import { updateDistrictMutation } from '../manageDistrictsMapService/manageDistrictsMapService.api';

const DistrictBordersGate = createGate();

const $isFailure = createStore<boolean>(false)
  .on(deleteHouseInDistrictMutation.finished.failure, () => true)
  .on(addHouseToDistrictMutation.finished.failure, () => true)
  .reset(updateDistrictMutation.$finished.updates);

sample({
  clock: DistrictBordersGate.open,
  target: [existingHousingStocksQuery.start, existingDistrictsQuery.start],
});

$isFailure.watch((data) => console.log({ fail: data }));

$isFailure.watch((isFailure) => {
  if (isFailure) {
    message.error(
      'При обновлении района возникли ошибки. Проверьте список домов и при необходимости внесите правки',
    );
  }
});

export const editDistrictBordersService = {
  gates: { DistrictBordersGate },
};
