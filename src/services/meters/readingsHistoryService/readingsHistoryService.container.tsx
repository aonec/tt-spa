import React from 'react';
import { useUnit } from 'effector-react';
import { ReadingHistoryModal } from './view/ReadingsHistoryModal';
import { ReadingsHistoryServiceProps } from './readingsHistoryService.types';
import { readingsHistoryService } from './readingsHistoryService.model';

const { inputs, outputs } = readingsHistoryService;

export const ReadingsHistoryContainer: React.FC<
  ReadingsHistoryServiceProps
> = ({ readonly }) => {
  const { isOpen, deviceId, closeReadingsHistoryModal } = useUnit({
    isOpen: outputs.$isReadingsHstoryModalOpen,
    deviceId: outputs.$readingsHistoryModalDeviceId,
    closeReadingsHistoryModal: inputs.closeReadingsHistoryModal,
  });

  return (
    <>
      {deviceId && (
        <ReadingHistoryModal
          closeReadingsHistoryModal={closeReadingsHistoryModal}
          deviceId={deviceId}
          isModal
          readonly={readonly}
          isOpen={isOpen}
        />
      )}
    </>
  );
};
