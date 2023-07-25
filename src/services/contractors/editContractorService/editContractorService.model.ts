import { createDomain, forward } from 'effector';
import { patchContractor } from './editContractorService.api';
import { ContractorResponse, ContractorUpdateRequest } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { ContractorDataType } from './editContractorService.types';
import { message } from 'antd';

const domain = createDomain('editContractorService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleEditcontractor = domain.createEvent<{
  contractorId: number;
  data: ContractorUpdateRequest;
}>();
const catchContractorData = domain.createEvent<ContractorDataType>();

const editContractorFx = domain.createEffect<
  { contractorId: number; data: ContractorUpdateRequest },
  ContractorResponse | null,
  EffectFailDataAxiosError
>(patchContractor);

const editContractorSuccess = editContractorFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(editContractorSuccess);

const $contractorData = domain
  .createStore<ContractorDataType | null>(null)
  .on(catchContractorData, (_, data) => data)
  .reset(editContractorSuccess);

forward({
  from: handleEditcontractor,
  to: editContractorFx,
});

editContractorFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

editContractorSuccess.watch(() =>
  message.success('Подрядчик успешно изменён!'),
);

export const editContractorService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    catchContractorData,
    handleEditcontractor,
    editContractorSuccess,
  },
  outputs: { $isModalOpen, $contractorData },
};
