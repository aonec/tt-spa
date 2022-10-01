import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { BufferedReadingValues } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { correctionReadingsService } from './correctionReadingsService.model';
import { CorrectionReadings } from './view/CorrectionReadings';

const { outputs } = correctionReadingsService;

export const CorrectionReadingsContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const task = useStore(outputs.$task);

  if (!task) return null;

  const handleReadingChange = (values: BufferedReadingValues) => {
    if (!task?.individualDevices) return null;

    const device = task?.individualDevices[0];
    const reading = device?.invalidReading;

    if (!reading?.readingDate) return null;

    handleChange({
      readings: [
        {
          value1: Number(values.value1),
          value2: Number(values.value2),
          value3: Number(values.value3),
          deviceId: device?.id,
          readingDate: reading?.readingDate,
          uploadTime: reading?.readingDateTime,
        },
      ],
    });
  };

  return (
    <CorrectionReadings handleReadingChange={handleReadingChange} task={task} />
  );
};
