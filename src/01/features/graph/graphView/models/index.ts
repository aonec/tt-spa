import { createEvent, createStore } from 'effector';
import { RequestNodeReadingsFunctionInterface } from '../../../../_api/node_readings_page';

export const setDataToStore = createEvent<RequestNodeReadingsFunctionInterface>();

export const $graphData = createStore<RequestNodeReadingsFunctionInterface>(
  {} as RequestNodeReadingsFunctionInterface,
);
