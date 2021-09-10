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
  onChange?: (readings: SwitchIndividualDeviceReadingsCreateRequest[]) => void;
  title: string;
  device: DataStringDevice;
}

export const ReadingsInput: React.FC<Props> = ({
  title,
  device,
  readings,
  onChange,
}) => {
  const { sliderIndex, up, down, canUp, canDown } = useSliderIndex();

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

  const readingByCurrentMonth = readings.find((elem) =>
    compareDates(elem.readingDate, moment().toISOString())
  );

  const currentReading = readingByCurrentMonth
    ? getReadingValuesArray(readingByCurrentMonth, rateNum)
    : null;

  function onChangeHandler(props: {
    value: string;
    index: number;
    readingDate?: string;
    isNew?: boolean;
    isPrevious?: boolean;
  }) {
    if (!onChange) return;

    const { value, index, readingDate, isNew, isPrevious } = props;

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
          <SliderArrow onClick={up}>{canUp && '<'}</SliderArrow>
          <div>{getPreviousReadingsMonth(sliderIndex)}</div>
          <SliderArrow onClick={down}>{canDown && '>'}</SliderArrow>
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

const compareDates = (date1: string, date2: string) =>
  moment(date1).format('MM.YYYY') === moment(date2).format('MM.YYYY');

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
) => {
  const currentDate = moment();
  return readings.reduce((acc, elem) => {
    if (currentDate.diff(elem.readingDate, 'months') > 11) return acc;

    const index =
      Number(moment().format('M')) -
      Number(moment(elem.readingDate).format('M')) -
      1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: SwitchIndividualDeviceReadingsCreateRequest });
};

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
  /* box-shadow: 0 4px 8px rgba(78, 93, 146, 0.16); */
  border: 1px solid #d9d9d9;
  border-radius: 4px;
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
  const limit = 3;
  const [sliderIndex, setSliderIndex] = useState(0);

  return {
    sliderIndex,
    canUp: sliderIndex < 3,
    canDown: sliderIndex > 0,
    up() {
      setSliderIndex((prev) => (prev !== limit ? ++prev : prev));
    },
    down() {
      setSliderIndex((prev) => (prev !== 0 ? --prev : prev));
    },
  };
}
