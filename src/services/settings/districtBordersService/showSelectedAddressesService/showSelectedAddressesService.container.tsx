import React from 'react';
import { showSelectedAddressesService } from './showSelectedAddressesService.model';
import { useUnit } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { AddressesList } from 'services/settings/resourcesDisablingScheduleService/views/displayResourceDisconenctionAddressesServiceService/views/AddressesList';

const { inputs, outputs } = showSelectedAddressesService;

export const ShowSelectedAddressesContainer = () => {
  const { closeModal, isOpen, selectedAddresses } = useUnit({
    isOpen: outputs.$isOpen,
    closeModal: inputs.closeModal,
    selectedAddresses: outputs.$selectedAddresses,
  });

  return (
    <FormModal
      formId="display-district-borders-addresses-service"
      title="Список адресов"
      visible={isOpen}
      onCancel={closeModal}
      customFooter={<></>}
      form={<AddressesList streets={selectedAddresses} />}
    />
  );
};
