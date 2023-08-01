import { createDomain, forward, sample } from 'effector';
import { currentUserService } from 'services/currentUserService';

const domain = createDomain('sendReportToEmailService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

const openSetEmailModal = domain.createEvent();
const closeSetEmailModal = domain.createEvent();

const $isOpenSetEmail = domain
  .createStore(false)
  .on(openSetEmailModal, () => true)
  .on(closeSetEmailModal, () => false);

const submitEmail = domain.createEvent();

const setEmail = domain.createEvent<string>();
const $defaultEmail = domain.createStore('').on(setEmail, (_, email) => email);

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
