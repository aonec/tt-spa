import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import { ReadingHistoryPage } from '..';
import {
  $isReadingsHstoryModalOpen,
  $readingsHistoryModalDeviceId,
  closeReadingsHistoryModal,
} from '../models';

interface Props {
  readonly?: boolean;
}

export const ReadingsHistoryModal: React.FC<Props> = ({ readonly }) => {
  const open = useStore($isReadingsHstoryModalOpen);
  const deviceId = useStore($readingsHistoryModalDeviceId);

  return (
    <ModalTT
      width={1080}
      visible={open}
      title="История показаний"
      onCancel={closeReadingsHistoryModal}
      centered
      footer={<></>}
    >
      {deviceId && (
        <ReadingHistoryPage deviceId={deviceId} isModal readonly={readonly} />
      )}
    </ModalTT>
  );
};
