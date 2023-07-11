import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { displayResourceDisconenctionAddressesServiceService } from './displayResourceDisconenctionAddressesServiceService.model';
import { AddressesList } from './views/AddressesList';
import { DisconnectionAddressesModalTitle } from './views/DisconnectionAddressesModalTitle';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = displayResourceDisconenctionAddressesServiceService;

export const DisplayResourceDisconenctionAddressesServiceContainer = () => {
  const streets = useStore(outputs.$addresses);
  const disconnection = useStore(outputs.$disconnection);

  const closeModal = useEvent(inputs.closeModal);

  const isModalOpen = Boolean(disconnection);

  const titleComponent = useMemo(() => {
    if (!disconnection) {
      return null;
    }
    return <DisconnectionAddressesModalTitle disconnection={disconnection} />;
  }, [disconnection]);

  return (
    <FormModal
      formId="display-resource-disconenction-addresses-service"
      title={titleComponent}
      visible={isModalOpen}
      onCancel={() => closeModal()}
      customFooter={<></>}
      form={<AddressesList streets={streets} />}
    />
  );
};
