import React, { FC, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $task } from '01/features/tasks/displayTask/models';
import { IndividualDeviceListItemResponse } from 'myApi';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReadingInputStyled } from '01/features/tasks/correctionReadings/CorrectionReadings.styled';

type Props = {
  getData: () => void;
};

type Reading = {
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  deviceId: number;
};

export const Readings: FC<Props> = () => {
  const [readings, setReadings] = useState<Reading[]>([]);

  const task = useStore($task);

  useEffect(() => {
    const devices = task?.individualDevices;
    if (devices) {
      setReadings(
        devices.map((device) => ({
          value1: undefined,
          value2: undefined,
          value3: undefined,
          value4: undefined,
          deviceId: device.id,
        }))
      );
    }
  }, [task]);

  const onChangeReading = (index: number, value: number) => {
    setReadings((prev) =>
      prev.map((elem, i) => (i === index ? { ...elem, value1: value } : elem))
    );
  };

  return (
    <div>
      {task?.individualDevices?.map((device, index) => (
        <ReadingLine
          device={device as any}
          reading={readings[index]}
          onChangeReading={(value) => onChangeReading(index, value)}
        />
      ))}
    </div>
  );
};

const ReadingLine = ({
  device,
  reading,
  onChangeReading,
}: {
  device: IndividualDeviceListItemResponse;
  reading?: Reading;
  onChangeReading: (value: number) => void;
}) => {
  return (
    <div>
      <Flex style={{ justifyContent: 'space-between' }}>
        <DeviceInfo device={device} />
        <ReadingInputStyled
          onChange={(e) => onChangeReading(e.target.value as any)}
          value={reading?.value1}
          resource={device.resource}
          type="number"
        />
      </Flex>
      <SpaceLine />
    </div>
  );
};
