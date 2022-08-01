import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { axios } from '../../../../api/axios';

export const $isDevSettingsModalOpen = createStore(false);

export const devSettingsForm = createForm({
  fields: {
    devUrl: {
      init: axios.defaults.baseURL,
    },
  },
});

export const openDevSettingsModal = createEvent();
export const closeDevSettingsModal = createEvent();
