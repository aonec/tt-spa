import { createDomain } from 'effector';
import { PersonalNumberActions } from './selectPersonalNumberActionService.types';

const domain = createDomain('selectPersonalNumberActionService');

const setSelectActionModalOpen = domain.createEvent<boolean>();
const setChoosePersonalNumberModalOpen = domain.createEvent<boolean>();

const setAction = domain.createEvent<PersonalNumberActions>();

const $isSelectActionModalOpen = domain
  .createStore<boolean>(false)
  .on(setSelectActionModalOpen, (_, isOpen) => isOpen)
  .reset(setAction);

const $isChoosePersonalNumberModalOpen = domain
  .createStore<boolean>(false)
  .on(setAction, () => true)
  .reset(setChoosePersonalNumberModalOpen);

const $selectedAction = domain
  .createStore<PersonalNumberActions | null>(null)
  .on(setAction, (_, action) => action)

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
