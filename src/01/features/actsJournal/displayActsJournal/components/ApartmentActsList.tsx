import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useStore } from 'effector-react';
import React from 'react';
import { $apartmentActs, fetchApartmentActsFx } from '../models';

export const ApartmentActsList = () => {
  const pending = useStore(fetchApartmentActsFx.pending);

  const acts = useStore($apartmentActs);

  return (
    <PendingLoader loading={pending}>
      {acts?.length === 0 && 'Нет актов'}
    </PendingLoader>
  );
};
