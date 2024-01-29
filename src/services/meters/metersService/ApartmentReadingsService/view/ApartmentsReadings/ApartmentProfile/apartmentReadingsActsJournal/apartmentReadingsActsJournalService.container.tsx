import React, { FC } from 'react';
import { apartmentReadingsActsJournalService } from './apartmentReadingsActsJournalService.models';
import { ApartmentActsContainer } from './apartmentReadingsActsJournalService.types';
import { ApartmentActsJournal } from './ApartmentActsJournal';
import { useUnit } from 'effector-react';
import { apartmentActsListQuery } from './apartmentReadingsActsJournalService.api';

const {
  gates: { ApartmentActsGate },
} = apartmentReadingsActsJournalService;

export const ApartmentReadingsActsJournalContainer: FC<
  ApartmentActsContainer
> = ({ apartmentId }) => {
  const { apartmentActs, isLoading } = useUnit({
    apartmentActs: apartmentActsListQuery.$data,
    isLoading: apartmentActsListQuery.$pending,
  });

  return (
    <>
      <ApartmentActsGate id={apartmentId} />
      <ApartmentActsJournal
        apartmentActs={apartmentActs}
        isLoading={isLoading}
        apartmentId={apartmentId}
      />
    </>
  );
};
