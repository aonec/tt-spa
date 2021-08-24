import {
  IndividualDeviceReadingsCreateListResponse,
  IndividualDeviceReadingsCreateRequest,
} from './../../../../../myApi';
import { createEffect, createEvent } from 'effector';

export const readingFieldButtonClicked = createEvent<IndividualDeviceReadingsCreateRequest>();

export const createReadingFx = createEffect<
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse
>();
