import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { editReadingsHistoryService } from './editReadingsHistoryService.model';
import { EditReadingsHistoryModal } from './view/EditReadingsHistoryModal';

const { inputs, outputs } = editReadingsHistoryService;

export const EditReadingsHistoryContainer = () => {
  const device = useStore(outputs.$selectedDevice);
  const isOpen = useStore(outputs.$isOpen);
  const readings = useStore(outputs.$readings);
  const readingDate = useStore(outputs.$readingDate);

  const handleCloseModal = useEvent(inputs.closeModal);
  const setReadingDate = useEvent(inputs.setReadingDate);
  const setReadings = useEvent(inputs.setReadings);
  const editReadings = useEvent(inputs.editReadingsHistory);

  if (!device) {
    return null;
  }

  return (
    <EditReadingsHistoryModal
      handleCloseModal={() => handleCloseModal()}
      isOpen={isOpen}
      device={device}
      readingDate={readingDate}
      setReadingDate={setReadingDate}
      readings={readings}
      setReadings={setReadings}
      editReadings={() => editReadings()}
    />
  );
};
