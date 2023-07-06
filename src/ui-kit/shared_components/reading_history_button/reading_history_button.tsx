import { HistoryIcon } from '../../icons';
import { openReadingsHistoryModal } from '../../../services/meters/readingsHistoryService/models';
import React from 'react';

export const ReadingsHistoryButton = ({ deviceId }: { deviceId: number }) => (
  <HistoryIcon
    style={{ cursor: 'pointer' }}
    onClick={() => openReadingsHistoryModal(deviceId)}
  />
);
