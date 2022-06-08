import React, { FC, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $task } from '01/features/tasks/displayTask/models';
import { IndividualDeviceListItemResponse } from 'myApi';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReadingInputStyled } from '01/features/tasks/correctionReadings/CorrectionReadings.styled';
import moment from 'moment';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';

type Props = {
  getData: (data: any) => void;
};

type Reading = {
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  deviceId: number;
};

export const Readings: FC<Props> = ({ getData }) => {
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

  useEffect(() => {
    if (readings.length) {
      getData({
        readings: readings.map((elem) => ({
          ...elem,
          readingDate: moment().toISOString(true),
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
            <ReadingInputStyled
              index={index + 1}
              onChange={(e) =>
                onChangeReading(e.target.value as any, index + 1)
              }
              value={value}
              resource={device.resource}
              type="number"
              style={{ marginBottom: '15px', padding: "7px 12px" }}
              placeholder={`T${index + 1}`}
            />
          ))}
        </Flex>
      </Flex>
      <SpaceLine />
    </div>
  );
};
