import { combine, createDomain, sample } from 'effector';
import { prepareFilterBeforeSenging } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.utils';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import { downloadSubscribersConsumption } from './exportSubscribersConsumptionService.api';
import { ExportSubscribersConsumptionPayload } from './exportSubscribersConsumptionService.types';

const domain = createDomain('exportSubscribersConsumptionService');

const closeModal = domain.createEvent();
const openModal = domain.createEvent<number>();

const $isModalOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const $selectedHousingStock = domain
  .createStore<number>(0)
  .on(openModal, (_, id) => id);

const setFileName = domain.createEvent<string>();
const $fileName = domain
  .createStore<string>('')
  .on(setFileName, (_, name) => name);

const setSubscriberStatisticsFilter = domain.createEvent<SubscriberStatisticsForm | null>();
const $subscriberStatisticsFilter = domain
  .createStore<SubscriberStatisticsForm | null>(null)
  .on(setSubscriberStatisticsFilter, (_, filter) => filter);

const exportStatistic = domain.createEvent();
const exportStatiscticFx = domain.createEffect<
  ExportSubscribersConsumptionPayload,
  void
>(downloadSubscribersConsumption);

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
    }
  ),
  clock: exportStatistic,
  target: exportStatiscticFx,
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
  },
};
