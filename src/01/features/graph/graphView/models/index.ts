import { ReadingsInterface } from '01/_pages/Graph/components/GraphView/GraphView.types';
import { createEvent, createStore } from 'effector';

export const setDataToStore = createEvent<ReadingsInterface>();

export const $graphData = createStore<ReadingsInterface | null>(null);
