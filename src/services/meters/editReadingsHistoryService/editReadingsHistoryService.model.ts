import { message } from 'antd';
import { combine, createDomain, forward, guard, sample } from 'effector';
import dayjs from 'api/dayjs';
import { IndividualDeviceListItemResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService';
import { BufferedReadingValues } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import { fetchEditReadingsHistory } from './editReadingsHistoryService.api';
import { ReadingDateFormat } from './editReadingsHistoryService.constants';
import { EditReadingsHistoryPayload } from './editReadingsHistoryService.types';

const domain = createDomain('editReadingsHistoryService');

const editReadingsHistory = domain.createEvent();
const editReadingsHistoryFx = domain.createEffect<
  EditReadingsHistoryPayload,
  void,
  EffectFailDataAxiosError
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
  .createStore<string>(dayjs().startOf('month').format(ReadingDateFormat))
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

forward({
  from: editReadingsHistoryFx.doneData,
  to: [
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
    closeModal,
  ],
});

editReadingsHistoryFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

editReadingsHistoryFx.doneData.watch(() =>
  message.success('Показание успешно сохранено'),
);

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
