import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { deleteContractor } from './deleteContractorService.api';
import { ContractorResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('deleteContractorService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const catchContractorId = domain.createEvent<{
  id: number;
  name: string | null;
}>();

const handleDeleteContractor = domain.createEvent();

const deleteContractorFx = domain.createEffect<
  number,
  ContractorResponse,
  EffectFailDataAxiosError
>(deleteContractor);

const deleteContractorSuccess = deleteContractorFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(deleteContractorSuccess);

const $contractorData = domain
  .createStore<{ id: number; name: string | null } | null>(null)
  .on(catchContractorId, (_, data) => data)
  .reset(deleteContractorSuccess);

guard({
  clock: handleDeleteContractor,
  source: sample({
    source: $contractorData,
    fn: (data) => data?.id || null,
  }),
  filter: (id): id is number => Boolean(id),
  target: deleteContractorFx,
});

deleteContractorFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

deleteContractorSuccess.watch(() =>
  message.success('Подрядчик успешно удален!')
);

export const deleteContractorService = {
  inputs: {
    handleDeleteContractor,
    handleCloseModal,
    handleOpenModal,
    catchContractorId,
    deleteContractorSuccess,
  },
  outputs: { $isModalOpen, $contractorData },
};
