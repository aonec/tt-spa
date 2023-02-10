import { createDomain, forward } from 'effector';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import { GetConsolidatedReport } from './consolidatedReportService.types';
import { getConsolidatedReport } from './consolidatedReportService.api';

const domain = createDomain('consolidatedReportService');

const openConsolidatedReportModal = domain.createEvent();
const closeConsolidatedReportModal = domain.createEvent();

const handleSubmit = domain.createEvent<GetConsolidatedReport>();

const downloadConsolidatedReportFx = domain.createEffect<
  GetConsolidatedReport,
  void,
  EffectFailDataAxiosError
>(getConsolidatedReport);

forward({
  from: handleSubmit,
  to: downloadConsolidatedReportFx,
});

downloadConsolidatedReportFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const $isModalOpen = domain
  .createStore(false)
  .on(openConsolidatedReportModal, () => true)
  .reset(closeConsolidatedReportModal, downloadConsolidatedReportFx.doneData);

const $isLoading = downloadConsolidatedReportFx.pending;

export const consolidatedReportService = {
  inputs: {
    openConsolidatedReportModal,
    closeConsolidatedReportModal,
    handleSubmit,
  },
  outputs: { $isModalOpen, $isLoading },
};
