import { createEffect, createEvent, createStore } from 'effector';

export const splitPersonalNumberFx = createEffect();

export const $splitPersonalNumberStageNumber = createStore<number>(1);

export const setSplitPersonalNumberStage = createEvent<number>();
