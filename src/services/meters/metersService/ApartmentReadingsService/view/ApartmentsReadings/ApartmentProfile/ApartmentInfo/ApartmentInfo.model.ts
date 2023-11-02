import { createEvent, createStore } from 'effector';

import { printApartmentDevicesCertificateService } from 'services/apartments/printApartmentDevicesCertificateService/printApartmentDevicesCertificateService.models';

const togglePanel = createEvent();

const $isPanelOpen = createStore(false).on(togglePanel, (isOpen) => !isOpen);

export const apartmentInfoService = {
  inputs: {
    togglePanel,
    printIssueCertificate:
      printApartmentDevicesCertificateService.inputs
        .getIssueCertificateButtonClicked,
  },
  outputs: {
    $isPanelOpen,
  },
};
