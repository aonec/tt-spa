
import { createEffect, createEvent } from 'effector';
import { IndividualDeviceReadingsCreateListResponse, IndividualDeviceReadingsCreateRequest } from '../../../../../api/types';

export const readingFieldButtonClicked = createEvent<IndividualDeviceReadingsCreateRequest>();

export const createReadingFx = createEffect<
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsCreateListResponse
>();
