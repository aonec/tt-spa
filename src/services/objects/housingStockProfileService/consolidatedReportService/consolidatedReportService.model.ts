import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import { GetConsolidatedReport } from './consolidatedReportService.types';
import { getConsolidatedReport } from './consolidatedReportService.api';

const openConsolidatedReportModal = createEvent();
const closeConsolidatedReportModal = createEvent();

const handleSubmit = createEvent<GetConsolidatedReport>();

const downloadConsolidatedReportFx = createEffect<
  GetConsolidatedReport,
  void,
  EffectFailDataAxiosError
>(getConsolidatedReport);

sample({
  clock: handleSubmit,
  target: downloadConsolidatedReportFx,
});

downloadConsolidatedReportFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const $isModalOpen = createStore(false)
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
