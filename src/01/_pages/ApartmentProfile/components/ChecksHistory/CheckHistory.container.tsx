import {
  $apartmentChecksDocuments,
  fetchApartmentChecksDocumentsFx,
} from '01/features/apartments/displayApartmentChecksHistory/models';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';
import { ChecksHistoryComponent } from './CheckHistory.component';
import { openCheckApartmentModal } from '01/features/apartments/checkApartment/models';
import {
  openEditApartmentCheckModal,
  removeApartmentCheckEv,
} from '01/features/apartments/checkApartment/models';

export const ChecksHistory = () => {
  const params = useParams<{ apartmentId: string }>();
  const apartmentId = Number(params.apartmentId);

  const documents = useStore($apartmentChecksDocuments);
  const pending = useStore(fetchApartmentChecksDocumentsFx.pending);

  const openCheckApartmentModalEv = useEvent(openCheckApartmentModal);
  const removeApartmentCheck = useEvent(removeApartmentCheckEv);

  const openEditApartmentCheckModalEv = useEvent(openEditApartmentCheckModal);

  return (
    <ChecksHistoryComponent
      apartmentId={apartmentId}
      documents={documents}
      pending={pending}
      openCheckApartmentModal={openCheckApartmentModalEv}
      removeApartmentCheck={removeApartmentCheck}
      openEditApartmentCheckModal={openEditApartmentCheckModalEv}
    />
  );
};
