import { createDomain, forward } from 'effector';
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

const $defaultEmail = currentUserService.outputs.$currentUser.map(
  (user) => user?.email || ''
);

forward({
  from: submitEmail,
  to: [closeModal, closeSetEmailModal],
});

export const sendReportToEmailService = {
  inputs: {
    openModal,
    closeModal,
    submitEmail,
  },
  outputs: {
    $defaultEmail,
    $isOpen,
  },
};
