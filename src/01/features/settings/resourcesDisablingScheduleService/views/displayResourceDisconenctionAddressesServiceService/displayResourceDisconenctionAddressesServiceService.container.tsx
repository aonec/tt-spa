import { ModalText } from '01/shared/ui/Modal/Modal';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayResourceDisconenctionAddressesServiceService } from './displayResourceDisconenctionAddressesServiceService.model';
import { AddressesList } from './views/AddressesList';
import { DisconnectionAddressesModalTitle } from './views/DisconnectionAddressesModalTitle';

const { inputs, outputs } = displayResourceDisconenctionAddressesServiceService;

export const DisplayResourceDisconenctionAddressesServiceContainer = () => {
  const streets = useStore(outputs.$addresses);
  const disconnection = useStore(outputs.$disconnection);

  const closeModal = useEvent(inputs.closeModal);

  const isModalOpen = Boolean(disconnection);

  return (
    <>
      {disconnection && (
        <ModalTT
          title={
            <DisconnectionAddressesModalTitle disconnection={disconnection} />
          }
          visible={isModalOpen}
          onCancel={() => closeModal()}
          footer={null}
        >
          <AddressesList streets={streets} />
        </ModalTT>
      )}
    </>
  );
};
