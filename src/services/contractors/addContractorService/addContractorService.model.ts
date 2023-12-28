import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { ContractorCreateRequest, ContractorResponse } from 'api/types';
import { createContractor } from './addContractorService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const handleAddcontractor = createEvent<ContractorCreateRequest>();

const addContractorFx = createEffect<
  ContractorCreateRequest,
  ContractorResponse,
  EffectFailDataAxiosError
>(createContractor);

const addContractorSuccess = addContractorFx.doneData;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(addContractorSuccess);

sample({
  clock: handleAddcontractor,
  target: addContractorFx,
});

addContractorFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

addContractorSuccess.watch(() =>
  message.success('Подрядчик успешно добавлен!'),
);

export const addContractorService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    addContractorSuccess,
    handleAddcontractor,
  },
  outputs: { $isModalOpen },
};
