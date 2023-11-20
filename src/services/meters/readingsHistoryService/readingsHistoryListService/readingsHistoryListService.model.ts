import { createEffect, createEvent, sample } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import {
  IndividualDeviceReadingsCreateListResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'api/types';
import { createReading } from './readingsHistoryListService.api';
import { message } from 'antd';

export const readingFieldButtonClicked =
  createEvent<IndividualDeviceReadingsCreateRequest>();

export const createReadingFx = createEffect<
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse,
  EffectFailDataAxiosError
>();

createReadingFx.use(createReading);

sample({
  clock: readingFieldButtonClicked,
  filter: (reading) => Boolean(reading.value1),
  target: createReadingFx,
});

createReadingFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
