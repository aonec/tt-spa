import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { deleteContractor } from './deleteContractorService.api';
import { ContractorResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('deleteContractorService');

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

const $contractorData = domain
  .createStore<{ id: number; name: string | null } | null>(null)
  .on(catchContractorId, (_, data) => data)
  .reset(handleCloseModal);

forward({
  from: deleteContractorSuccess,
  to: handleCloseModal,
});

const $isModalOpen = $contractorData.map(Boolean);

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
  message.error(error.response.data.error.Text),
);

deleteContractorSuccess.watch(() =>
  message.success('Подрядчик успешно удален!'),
);

export const deleteContractorService = {
  inputs: {
    handleDeleteContractor,
    handleCloseModal,
    catchContractorId,
    deleteContractorSuccess,
  },
  outputs: { $isModalOpen, $contractorData },
};
