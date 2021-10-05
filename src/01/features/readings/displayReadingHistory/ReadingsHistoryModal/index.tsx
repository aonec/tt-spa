import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { ReadingHistoryPage } from '..';
import {
  $isReadingsHstoryModalOpen,
  $readingsHistoryModalDeviceId,
  closeReadingsHistoryModal,
} from '../models';

export const ReadingsHistoryModal: React.FC = () => {
  const open = useStore($isReadingsHstoryModalOpen);
  const deviceId = useStore($readingsHistoryModalDeviceId);

  return (
    <ModalTT
      width={960}
      visible={open}
      title="История показаний"
      onCancel={closeReadingsHistoryModal}
      centered
      footer={<></>}
    >
      {deviceId && <ReadingHistoryPage deviceId={deviceId} isModal />}
    </ModalTT>
  );
};
