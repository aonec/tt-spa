import { createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { currentUserService } from 'services/currentUserService';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

const openSetEmailModal = createEvent();
const closeSetEmailModal = createEvent();

const $isOpenSetEmail = createStore(false)
  .on(openSetEmailModal, () => true)
  .on(closeSetEmailModal, () => false);

const submitEmail = createEvent();

const setEmail = createEvent<string>();
const $defaultEmail = createStore('').on(setEmail, (_, email) => email);

sample({
  source: currentUserService.outputs.$currentUser.map(
    (user) => user?.email || '',
  ),
  clock: openModal,
  target: setEmail,
});

forward({
  from: submitEmail,
  to: [closeModal, closeSetEmailModal],
});

forward({
  from: openSetEmailModal,
  to: closeModal,
});

export const sendReportToEmailService = {
  inputs: {
    openModal,
    closeModal,
    submitEmail,
    openSetEmailModal,
    closeSetEmailModal,
    setEmail,
  },
  outputs: {
    $defaultEmail,
    $isOpen,
    $isOpenSetEmail,
  },
};
