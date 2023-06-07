import { createDomain } from 'effector';
import { printApartmentDevicesCertificateService } from 'services/apartments/printApartmentDevicesCertificateService/printApartmentDevicesCertificateService.models';

const domain = createDomain('apartmentInfoService');

const togglePanel = domain.createEvent();

const $isPanelOpen = domain
  .createStore(false)
  .on(togglePanel, (isOpen) => !isOpen);

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
