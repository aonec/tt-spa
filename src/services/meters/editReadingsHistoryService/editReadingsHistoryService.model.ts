import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { combine, sample } from 'effector';
import dayjs from 'api/dayjs';
import { IndividualDeviceListItemResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService';
import { BufferedReadingValues } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import { fetchEditReadingsHistory } from './editReadingsHistoryService.api';
import { ReadingDateFormat } from './editReadingsHistoryService.constants';
import { EditReadingsHistoryPayload } from './editReadingsHistoryService.types';

const editReadingsHistory = createEvent();
const editReadingsHistoryFx = createEffect<
  EditReadingsHistoryPayload,
  void,
  EffectFailDataAxiosError
>(fetchEditReadingsHistory);

const openModal = createEvent<IndividualDeviceListItemResponse>();
const closeModal = createEvent();

const $selectedDevice = createStore<IndividualDeviceListItemResponse | null>(
  null,
)
  .on(openModal, (_, device) => device)
  .reset(closeModal);
const $isOpen = $selectedDevice.map((device) => Boolean(device));

const setReadingDate = createEvent<string>('');
const $readingDate = createStore<string>(
  dayjs().startOf('month').format(ReadingDateFormat),
)
  .on(setReadingDate, (_, date) => date)
  .reset(closeModal);

const setReadings = createEvent<BufferedReadingValues>();
const $readings = createStore<BufferedReadingValues>({
  value1: '',
  value2: '',
  value3: '',
})
  .on(setReadings, (_, readings) => readings)
  .reset(closeModal);

sample({
  source: sample({
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

sample({
  clock: editReadingsHistoryFx.doneData,
  target: [
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
