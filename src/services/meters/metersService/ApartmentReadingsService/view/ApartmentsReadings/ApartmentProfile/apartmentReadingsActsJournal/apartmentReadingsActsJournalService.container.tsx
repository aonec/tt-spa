import React, { FC } from 'react';
import { apartmentReadingsActsJournalService } from './apartmentReadingsActsJournalService.models';
import { ApartmentActsContainer } from './apartmentReadingsActsJournalService.types';
import { ApartmentActsJournal } from './ApartmentActsJournal';
import { useUnit } from 'effector-react';
import { apartmentActsListQuery } from './apartmentReadingsActsJournalService.api';
import { actsCardService } from 'services/apartments/actsCardService';

const {
  gates: { ApartmentActsGate },
} = apartmentReadingsActsJournalService;

export const ApartmentReadingsActsJournalContainer: FC<
  ApartmentActsContainer
> = ({ apartmentId }) => {
  const { apartmentActs, isLoading, handleSaveFile } = useUnit({
    apartmentActs: apartmentActsListQuery.$data,
    isLoading: apartmentActsListQuery.$pending,
    handleSaveFile: actsCardService.inputs.saveFile,
  });

  return (
    <>
      <ApartmentActsGate id={apartmentId} />
      <ApartmentActsJournal
        apartmentActs={apartmentActs}
        isLoading={isLoading}
        apartmentId={apartmentId}
        handleSaveFile={handleSaveFile}
      />
    </>
  );
};
