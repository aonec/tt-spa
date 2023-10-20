import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { prepareFilterBeforeSenging } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.utils';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import { downloadSubscribersConsumption } from './exportSubscribersConsumptionService.api';
import { ExportSubscribersConsumptionPayload } from './exportSubscribersConsumptionService.types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const closeModal = createEvent();
const openModal = createEvent<number>();

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const $selectedHousingStock = createStore<number>(0).on(
  openModal,
  (_, id) => id,
);

const setFileName = createEvent<string>();
const $fileName = createStore<string>('').on(setFileName, (_, name) => name);

const setSubscriberStatisticsFilter =
  createEvent<SubscriberStatisticsForm | null>();
const $subscriberStatisticsFilter =
  createStore<SubscriberStatisticsForm | null>(null).on(
    setSubscriberStatisticsFilter,
    (_, filter) => filter,
  );

const exportStatistic = createEvent();
const exportStatiscticFx = createEffect<
  ExportSubscribersConsumptionPayload,
  void,
  EffectFailDataAxiosError
>(downloadSubscribersConsumption);

const $isLoading = exportStatiscticFx.pending;

sample({
  clock: exportStatiscticFx.doneData,
  target: closeModal,
});

sample({
  source: combine(
    $fileName,
    $selectedHousingStock,
    $subscriberStatisticsFilter,
    (fileName, HousingStockId, filter) => {
      if (!filter) {
        return { fileName, params: { HousingStockId } };
      }
      const preparedFilter = prepareFilterBeforeSenging({
        ...filter,
        HousingStockId,
      });
      return { fileName, params: { ...preparedFilter } };
    },
  ),
  clock: exportStatistic,
  target: exportStatiscticFx,
});

exportStatiscticFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const exportSubscribersConsumptionService = {
  inputs: {
    closeModal,
    openModal,
    setFileName,
    exportStatistic,
    setSubscriberStatisticsFilter,
  },
  outputs: {
    $isModalOpen,
    $fileName,
    $isLoading,
  },
};
