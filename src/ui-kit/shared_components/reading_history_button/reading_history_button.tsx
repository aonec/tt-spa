import { HistoryIcon } from '../../icons';
import { openReadingsHistoryModal } from '../../../01/features/readings/displayReadingHistory/models';
import React from 'react';

export const ReadingsHistoryButton = ({ deviceId }: { deviceId: number }) => (
  <HistoryIcon
    style={{ cursor: 'pointer' }}
    onClick={() => openReadingsHistoryModal(deviceId)}
  />
);
 