import React, { FC, useEffect, useState } from 'react';
import { InputReadingsProps, Reading } from './InputReadings.types';
import { useStore } from 'effector-react';
import { IndividualDeviceOnTaskResponse } from 'myApi';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { getReadingMonth } from './InputReadings.utils';
import { MonthWrapper, ReadingInputSC } from './InputReadings.styled';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';

export const InputReadings: FC<InputReadingsProps> = ({ handleChange }) => {
  const [readings, setReadings] = useState<Reading[]>([]);

  const task = useStore(taskProfileService.outputs.$task);

  useEffect(() => {
    const devices = task?.individualDevices;

    if (devices) {
      setReadings(
        devices.map((device) => {
          const readingDate =
            device.invalidReading?.readingDate || task?.creationTime!;
          return {
            value1: null,
            value2: null,
            value3: null,
            value4: null,
            deviceId: device.id,
            readingDate,
          };
        }),
      );
    }
  }, [task]);

  useEffect(() => {
    if (readings.length) {
      handleChange({
        readings: readings.map((elem) => ({
          ...elem,
          value1: elem.value1 || 0,
          value2: elem.value2,
          value3: elem.value3,
          value4: elem.value4,
        })),
      });
    }
  }, [readings]);

  const onChangeReading = (
    index: number,
    value: string,
    valueIndex: number,
  ) => {
    setReadings((prev) =>
      prev.map((elem, i) =>
        i === index
          ? {
              ...elem,
              [`value${valueIndex}`]: value === '' ? '' : Number(value),
            }
          : elem,
      ),
    );
  };

  return (
    <div>
      {task?.individualDevices?.map((device, index) => (
        <ReadingLine
          device={device}
          reading={readings[index]}
          onChangeReading={(value, valueIndex) =>
            onChangeReading(index, value, valueIndex)
          }
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
  device: IndividualDeviceOnTaskResponse;
  reading?: Reading;
  onChangeReading: (value: string, valueIndex: number) => void;
}) => {
  const rateNumber = getIndividualDeviceRateNumByName(device.rateType);

  const readingValues = reading
    ? getArrayByCountRange(rateNumber, (count) => {
        const key = `value${count}` as
          | 'value1'
          | 'value2'
          | 'value3'
          | 'value4';

        return reading[key];
      })
    : [];
  return (
    <div>
      <Flex style={{ justifyContent: 'space-between' }}>
        <DeviceInfo device={device} />
        <Flex style={{ flexDirection: 'column' }}>
          {readingValues.map((value, index) => (
            <>
              <MonthWrapper>
                {reading && getReadingMonth(reading.readingDate)}
              </MonthWrapper>
              <ReadingInputSC
                index={index + 1}
                onChange={(e) => onChangeReading(e.target.value, index + 1)}
                value={value || ''}
                resource={device.resource}
                type="number"
                placeholder={`T${index + 1}`}
              />
            </>
          ))}
        </Flex>
      </Flex>
      <SpaceLine />
    </div>
  );
};
