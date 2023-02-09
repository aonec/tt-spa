import { createDomain } from 'effector';
import { getIssueCertificateButtonClicked } from '01/features/apartments/printIssueCertificate/models';

const domain = createDomain('apartmentInfoService');

const togglePanel = domain.createEvent();

const $isPanelOpen = domain
  .createStore(false)
  .on(togglePanel, (isOpen) => !isOpen);

export const apartmentInfoService = {
  inputs: {
    togglePanel,
    printIssueCertificate: getIssueCertificateButtonClicked,
  },
  outputs: {
    $isPanelOpen,
  },
};
