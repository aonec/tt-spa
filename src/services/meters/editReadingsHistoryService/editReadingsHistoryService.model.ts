import { combine, createDomain, guard, sample } from 'effector';
import moment from 'moment';
import { IndividualDeviceListItemResponse } from 'myApi';
import { BufferedReadingValues } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import { fetchEditReadingsHistory } from './editReadingsHistoryService.api';
import { ReadingDateFormat } from './editReadingsHistoryService.constants';
import { EditReadingsHistoryPayload } from './editReadingsHistoryService.types';

const domain = createDomain('editReadingsHistoryService');

const editReadingsHistory = domain.createEvent();
const editReadingsHistoryFx = domain.createEffect<
  EditReadingsHistoryPayload,
  void
>(fetchEditReadingsHistory);

const openModal = domain.createEvent<IndividualDeviceListItemResponse>();
const closeModal = domain.createEvent();

const $selectedDevice = domain
  .createStore<IndividualDeviceListItemResponse | null>(null)
  .on(openModal, (_, device) => device)
  .reset(closeModal);
const $isOpen = $selectedDevice.map((device) => Boolean(device));

const setReadingDate = domain.createEvent<string>('');
const $readingDate = domain
  .createStore<string>(moment().startOf('month').format(ReadingDateFormat))
  .on(setReadingDate, (_, date) => date)
  .reset(closeModal);

const setReadings = domain.createEvent<BufferedReadingValues>();
const $readings = domain
  .createStore<BufferedReadingValues>({ value1: '', value2: '', value3: '' })
  .on(setReadings, (_, readings) => readings)
  .reset(closeModal);

sample({
  source: guard({
    source: combine($selectedDevice, $readings, $readingDate),
    filter: ([device]) => Boolean(device),
  }),
  clock: editReadingsHistory,
  fn: ([device, readings, readingDate]) => {
    const { value1, value2, value3 } = readings;
    return {
      deviceId: device?.id || 0,
      newReadings: {
        value1: Number(value1),
        value2: Number(value2) || null,
        value3: Number(value3) || null,
        readingDate,
      },
    };
  },
  target: editReadingsHistoryFx,
});

export const editReadingsHistoryService = {
  inputs: {
    openModal,
    closeModal,
    setReadingDate,
    setReadings,
    editReadingsHistory,
  },
  outputs: {
    $selectedDevice,
    $isOpen,
    $readingDate,
    $readings,
  },
};
