import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import { DataStringDevice, DeviceDataString } from '../DeviceDataString';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { SwitchIndividualDeviceReadingsCreateRequest } from '../../../../../../myApi';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import {
  getPreviousReadingsMonth,
  getDateByReadingMonthSlider,
} from '01/shared/lib/readings/getPreviousReadingsMonth';
import moment from 'moment';
import { RenderReadingFields } from '../RenderReadingFields';

interface Props {
  readings: SwitchIndividualDeviceReadingsCreateRequest[];
  onChange: (readings: SwitchIndividualDeviceReadingsCreateRequest[]) => void;
  title: string;
  device: DataStringDevice;
}

export const ReadingsInput: React.FC<Props> = ({
  title,
  device,
  readings,
  onChange,
}) => {
  const { sliderIndex, up, down } = useSliderIndex();

  const defaultValues = device.rateType
    ? getArrayByCountRange(
        getIndividualDeviceRateNumByName(device.rateType),
        () => ''
      )
    : [''];

  const rateNum = getIndividualDeviceRateNumByName(device.rateType!);

  const preparedReadingsArrWithEmpties = getReadingsArrayWithEmpties(readings);

  const previousReading = getReadingValuesArray(
    preparedReadingsArrWithEmpties[sliderIndex] as any,
    rateNum
  );

  const currentReading = getReadingValuesArray(
    preparedReadingsArrWithEmpties[1],
    rateNum
  );

  function onChangeHandler({
    value,
    index,
    readingDate,
    isNew,
    isPrevious,
  }: {
    value: string;
    index: number;
    readingDate?: string;
    isNew?: boolean;
    isPrevious?: boolean;
  }) {
    if (isNew) {
      const newReading = {
        ...(getNewReadingValuesByIndex(value, index) as any),
        readingDate: getNewReadingDate(isPrevious ? sliderIndex : -1),
      };

      return onChange([...readings, newReading]);
    }

    const newValues = readings.map((elem) => {
      if (readingDate !== elem.readingDate) return elem;

      const changedReading = {
        ...{ ...elem, [`value${index}`]: value },
        readingDate: readingDate!,
      };

      console.log(changedReading);

      return changedReading;
    });

    onChange(newValues);
  }

  return (
    <Wrap>
      <DeviceInfo>
        <Title>{title}</Title>
        <Space />
        <DeviceDataString device={device} />
      </DeviceInfo>
      <ReadingsWrap>
        <Flex style={{ justifyContent: 'space-between', maxWidth: 140 }}>
          <SliderArrow onClick={up}>{'<'}</SliderArrow>
          <div>{getPreviousReadingsMonth(sliderIndex)}</div>
          <SliderArrow onClick={down}>{'>'}</SliderArrow>
        </Flex>

        <Flex style={{ justifyContent: 'Center', maxWidth: 140 }}>
          <div>{getPreviousReadingsMonth(-1)}</div>
        </Flex>

        <RenderReadingFields
          clearValue
          style={{ marginRight: 0 }}
          values={previousReading?.value || defaultValues}
          editable
          suffix={device.measurableUnitString}
          onChange={(value, index) => {
            onChangeHandler({
              value,
              index,
              readingDate: previousReading?.readingDate,
              isNew: !previousReading,
              isPrevious: true,
            });
          }}
        />

        <RenderReadingFields
          clearValue
          style={{ marginRight: 0 }}
          values={currentReading?.value || defaultValues}
          editable
          suffix={device.measurableUnitString}
          onChange={(value, index) => {
            onChangeHandler({
              value,
              index,
              readingDate: currentReading?.readingDate,
              isNew: !currentReading,
              isPrevious: false,
            });
          }}
        />
      </ReadingsWrap>
    </Wrap>
  );
};

// const getDateByReadingMonthSlider = (sliderIndex: number) => {
//   const date = moment();

//   date.set('month', Number(date.format('m')));
//   date.set('day', 15);

//   return date;
// };

const getNewReadingDate = (sliderIndex: number) =>
  getDateByReadingMonthSlider(sliderIndex).toISOString();

function getNewReadingValuesByIndex(value: string, index: number) {
  const res = {
    value1: null,
    value2: null,
    value3: null,
    value4: null,
  };

  (res as any)[`value${index}`] = value;

  return res;
}

const getReadingsArrayWithEmpties = (
  readings: SwitchIndividualDeviceReadingsCreateRequest[]
) =>
  readings.reduce((acc, elem) => {
    const index =
      Number(moment().format('M')) -
      Number(moment(elem.readingDate).format('M')) -
      1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: SwitchIndividualDeviceReadingsCreateRequest });

const getReadingValuesArray = (
  reading?: SwitchIndividualDeviceReadingsCreateRequest,
  rateNum?: number
) => {
  if (!reading || !rateNum) return null;

  const res: (string | null)[] = [];

  for (let i = 0; i < rateNum; i++) res.push((reading as any)[`value${i + 1}`]);

  return { value: res, readingDate: reading.readingDate };
};

const SliderArrow = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 15px;
  color: rgba(39, 47, 90, 0.7);
`;

const Wrap = styled(Flex)`
  box-shadow: 0 4px 8px rgba(78, 93, 146, 0.16);
  padding: 15px 20px;
  justify-content: space-between;
`;

const DeviceInfo = styled.div``;

const ReadingsWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

function useSliderIndex() {
  const [sliderIndex, setSliderIndex] = useState(0);

  return {
    sliderIndex,
    up() {
      setSliderIndex((prev) => (prev !== 2 ? ++prev : prev));
    },
    down() {
      setSliderIndex((prev) => (prev !== 0 ? --prev : prev));
    },
  };
}
