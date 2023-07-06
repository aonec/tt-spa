import { useStore } from 'effector-react';
import React from 'react';
import {
  $isReadingsHstoryModalOpen,
  $readingsHistoryModalDeviceId,
  closeReadingsHistoryModal,
} from './models';
import { ReadingHistoryModal } from './view/ReadingsHistoryModal/ReadingsHistoryModal';

interface Props {
  readonly?: boolean;
}

export const ReadingsHistoryContainer: React.FC<Props> = ({ readonly }) => {
  const isOpen = useStore($isReadingsHstoryModalOpen);
  const deviceId = useStore($readingsHistoryModalDeviceId);

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
