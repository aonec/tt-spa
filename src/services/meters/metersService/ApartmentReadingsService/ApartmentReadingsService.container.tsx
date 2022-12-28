import React from 'react';
import { ApartmentsReadings } from './view/ApartmentsReadings';
import { apartmentReadingsService } from './ApartmentReadingsService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = apartmentReadingsService;

export const ApartmentReadingsContainer = () => {
  const setSearchMode = useEvent(inputs.setSearchMode);

  const searchMode = useStore(outputs.$searchMode);

  return (
    <ApartmentsReadings setSearchMode={setSearchMode} searchMode={searchMode} />
  );
};
