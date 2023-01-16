import { createDomain, forward } from 'effector';
import { ContractorCreateRequest, ContractorResponse } from 'myApi';
import { postContractor } from './addContractorService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('addContractorService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleAddcontractor = domain.createEvent<ContractorCreateRequest>();

const addContractorFx = domain.createEffect<
  ContractorCreateRequest,
  ContractorResponse,
  EffectFailDataAxiosError
>(postContractor);

const addContractorSuccess = addContractorFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(addContractorSuccess);

forward({
  from: handleAddcontractor,
  to: addContractorFx,
});

addContractorFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

addContractorSuccess.watch(() =>
  message.success('Подрядчик успешно добавлен!')
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
