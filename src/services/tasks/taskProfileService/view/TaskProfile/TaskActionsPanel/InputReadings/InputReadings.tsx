import React, { FC, useEffect, useState } from 'react';
import { InputReadingsProps, Reading } from './InputReadings.types';
import { useStore } from 'effector-react';
import { IndividualDeviceListItemResponse } from 'myApi';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReadingInputStyled } from '01/features/tasks/correctionReadings/CorrectionReadings.styled';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { getReadingMonth } from './InputReadings.utils';
import { MonthWrapper } from './InputReadings.styled';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

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
        })
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
    value: number,
    valueIndex: number
  ) => {
    setReadings((prev) =>
      prev.map((elem, i) =>
        i === index
          ? {
              ...elem,
              [`value${valueIndex}`]:
                (value as any) === '' ? '' : Number(value),
            }
          : elem
      )
    );
  };

  return (
    <div>
      {task?.individualDevices?.map((device, index) => (
        <ReadingLine
          device={device as any}
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
  device: IndividualDeviceListItemResponse;
  reading?: Reading;
  onChangeReading: (value: number, valueIndex: number) => void;
}) => {
  const rateNumber = getIndividualDeviceRateNumByName(device.rateType);
  const readingValues = reading
    ? getArrayByCountRange(
        rateNumber,
        (count) => (reading as any)[`value${count}`]
      )
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
              <ReadingInputStyled
                index={index + 1}
                onChange={(e) =>
                  onChangeReading(e.target.value as any, index + 1)
                }
                value={value}
                resource={device.resource}
                type="number"
                style={{ marginBottom: '15px', padding: '7px 12px' }}
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
