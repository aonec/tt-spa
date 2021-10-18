import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import { createEffect, createStore, createEvent } from 'effector';

export const switchPersonalNumber = createEffect();

export const $switchRequestStatus = createStore<RequestStatusShared>(null);

export const setRequestStatus = createEvent<RequestStatusShared>();
