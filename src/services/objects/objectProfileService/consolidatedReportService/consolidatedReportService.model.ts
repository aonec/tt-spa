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

downloadConsolidatedReportFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

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
