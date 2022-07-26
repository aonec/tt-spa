import {
  IndividualDeviceReadingsCreateListResponse,
  IndividualDeviceReadingsCreateRequest,
} from './../../.../../api/types';
import { createEffect, createEvent } from 'effector';

export const readingFieldButtonClicked = createEvent<IndividualDeviceReadingsCreateRequest>();

export const createReadingFx = createEffect<
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse
>();
