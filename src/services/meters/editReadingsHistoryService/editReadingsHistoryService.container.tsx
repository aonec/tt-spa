import { useUnit } from 'effector-react';
import React from 'react';
import { editReadingsHistoryService } from './editReadingsHistoryService.model';
import { EditReadingsHistoryModal } from './view/EditReadingsHistoryModal';

const { inputs, outputs } = editReadingsHistoryService;

export const EditReadingsHistoryContainer = () => {
  const {
    device,
    editReadings,
    handleCloseModal,
    isOpen,
    readingDate,
    readings,
    setReadingDate,
    setReadings,
  } = useUnit({
    device: outputs.$selectedDevice,
    isOpen: outputs.$isOpen,
    readings: outputs.$readings,
    readingDate: outputs.$readingDate,
    handleCloseModal: inputs.closeModal,
    setReadingDate: inputs.setReadingDate,
    setReadings: inputs.setReadings,
    editReadings: inputs.editReadingsHistory,
  });

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
