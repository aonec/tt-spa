import React from 'react';
import { readingsHistoryService } from 'services/meters/readingsHistoryService/readingsHistoryService.model';
import { HistoryIcon } from '../../icons';

export const ReadingsHistoryButton = ({ deviceId }: { deviceId: number }) => (
  <HistoryIcon
    style={{ cursor: 'pointer' }}
    onClick={() =>
      readingsHistoryService.inputs.openReadingsHistoryModal(deviceId)
    }
  />
);
