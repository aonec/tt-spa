import React from 'react';
import { ActsJournalProfile } from './view/ActsJournalProfile';
import { actsJournalService } from './actsJournalService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs, gates } = actsJournalService;
const { ActsJournalGate } = gates;

export const ActsJournalContainer = () => {
  const handleCreateAct = useEvent(inputs.createAct);
  const updateActsFilter = useEvent(inputs.updateActsFilter);
  const setPageNumber = useEvent(inputs.setPageNumber);
  const actCreated = inputs.actCreated;

  const isCreateLoading = useStore(outputs.$isCreateLoading);
  const isActsLoading = useStore(outputs.$isActsLoading);
  const actsPagedData = useStore(outputs.$actsPagedData);
  const actsFilter = useStore(outputs.$actsFilter);

  return (
    <>
      <ActsJournalGate />
      <ActsJournalProfile
        handleCreateAct={handleCreateAct}
        isCreateLoading={isCreateLoading}
        isActsLoading={isActsLoading}
        actsPagedData={actsPagedData}
        updateActsFilter={updateActsFilter}
        actsFilter={actsFilter}
        setPageNumber={setPageNumber}
        actCreated={actCreated}
      />
    </>
  );
};
