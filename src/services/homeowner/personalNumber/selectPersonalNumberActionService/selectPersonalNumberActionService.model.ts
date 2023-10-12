import { createEvent, createStore } from 'effector';

import { PersonalNumberActions } from './selectPersonalNumberActionService.types';

const setSelectActionModalOpen = createEvent<boolean>();
const setChoosePersonalNumberModalOpen = createEvent<boolean>();

const setAction = createEvent<PersonalNumberActions>();

const $isSelectActionModalOpen = createStore<boolean>(false)
  .on(setSelectActionModalOpen, (_, isOpen) => isOpen)
  .reset(setAction);

const $isChoosePersonalNumberModalOpen = createStore<boolean>(false)
  .on(setAction, (_, action) => {
    if (action === PersonalNumberActions.Add) {
      return false;
    } else {
      return true;
    }
  })
  .reset(setChoosePersonalNumberModalOpen);

const $selectedAction = createStore<PersonalNumberActions | null>(null).on(
  setAction,
  (_, action) => action,
);

export const selectPersonalNumberActionService = {
  inputs: {
    setSelectActionModalOpen,
    setAction,
    setChoosePersonalNumberModalOpen,
  },
  outputs: {
    $isSelectActionModalOpen,
    $isChoosePersonalNumberModalOpen,
    $selectedAction,
  },
};
