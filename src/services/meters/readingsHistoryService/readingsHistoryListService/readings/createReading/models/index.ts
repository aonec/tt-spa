import { createEffect, createEvent } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import {
  IndividualDeviceReadingsCreateListResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'myApi';

export const readingFieldButtonClicked =
  createEvent<IndividualDeviceReadingsCreateRequest>();

export const createReadingFx = createEffect<
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse,
  EffectFailDataAxiosError
>();
