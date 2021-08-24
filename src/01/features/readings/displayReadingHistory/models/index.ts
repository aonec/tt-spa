import { createGate } from 'effector-react';
import { IndividualDeviceReadingsHistoryResponse } from './../../../../../myApi';
import { createStore, createEffect, createEvent } from 'effector';

export const $readingHistory = createStore<IndividualDeviceReadingsHistoryResponse | null>(
  null
);

export const fetchReadingHistoryFx = createEffect<
  number,
  IndividualDeviceReadingsHistoryResponse
>();

export const ReadingHistoryGate = createGate<{ deviceId: number }>();

export const refetchReadingHistory = createEvent<number>();
