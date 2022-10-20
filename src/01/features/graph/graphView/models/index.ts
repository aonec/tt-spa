import { createEvent, createStore } from 'effector';
import { ArchivesDataModel } from 'myApi';

export const setDataToStore = createEvent<ArchivesDataModel>();

export const $graphData = createStore<ArchivesDataModel | null>(null);
