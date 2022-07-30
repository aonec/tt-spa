import React, { FC, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { MonthWrapper } from './Readings.styled';
import { IndividualDeviceListItemResponse } from '../../../../../api/types';
import { getIndividualDeviceRateNumByName } from '../../../MetersPage/components/MeterDevices/ApartmentReadings';
import { getArrayByCountRange } from '../../../MetersPage/components/utils';
import { ReadingInputStyled } from '../../../../features/tasks/correctionReadings/CorrectionReadings.styled';
import { getReadingMonth } from './Readings.utils';
import { Flex } from '../../../../shared/ui/Layout/Flex';
import { $task } from '../../../../features/tasks/displayTask/models';
import { SpaceLine } from '../../../../shared/ui/Layout/Space/Space';
import DeviceInfo from '../../../MetersPage/components/MeterDevices/components/DeviceInfo';

type Props = {
  getData: (data: any) => void;
};

type Reading = {
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  deviceId: number;
  readingDate: string;
};

export const Readings: FC<Props> = ({ getData }) => {
  const [readings, setReadings] = useState<Reading[]>([]);

  const task = useStore($task);

  useEffect(() => {
    const devices = task?.individualDevices;

    if (devices) {
      setReadings(
        devices.map((device) => {
          const readingDate =
            device.invalidReading?.readingDate || task?.creationTime!;
          return {
            value1: undefined,
            value2: undefined,
            value3: undefined,
            value4: undefined,
            deviceId: device.id,
            readingDate,
          };
        })
      );
    }
  }, [task]);

  useEffect(() => {
    if (readings.length) {
      getData({
        readings,
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
