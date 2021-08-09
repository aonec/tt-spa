import React, { useCallback, useEffect, useState } from 'react';
import rateTypeToNumber from '../_api/utils/rateTypeToNumber';
import { formEmptyReadingsObject } from '../utils/formEmptyReadingsObject';
import { getMonthFromDate } from '../utils/getMonthFromDate';
import moment from 'moment';
import axios from '../axios';
import { isNullInArray } from '../utils/checkArrayForNulls';
import {
  setInputFocused,
  setInputUnfocused,
} from '../Redux/ducks/readings/actionCreators';
import { useDispatch } from 'react-redux';
import {
  DeviceReadingsContainer,
  getInputColor,
} from '../_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import ReadingsBlock from '../_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import { v4 as uuid } from 'uuid';
import { IndividualDeviceListItemResponse } from '../../myApi';
import { toArray } from '01/features/individualDevices/addIndividualDevice/components/CheckFormValuesModal';

export const useReadings = (
  device: IndividualDeviceListItemResponse,
  sliderIndex = 0
) => {
  const [readingsState, setReadingsState] = useState<ReadingsStateType>();
  const [initialReadings, setInitialReadings] = useState<number[]>([]);

  const [previousReadings, setPreviousReadings] = useState<{
    [index: number]: string;
  }>({});

  const dispatch = useDispatch();

  const currentMonth = getMonthFromDate();
  const numberOfReadings = rateTypeToNumber(device.rateType);
  const emptyReadingsObject = formEmptyReadingsObject(numberOfReadings);
  const isReadingsCurrent =
    currentMonth === getMonthFromDate(device.readings![0]?.readingDate);

  useEffect(() => {
    const previousReadingsArray: number[] = [];
    const currentReadingsArray: number[] = [];

    const prevReadingsIndex = sliderIndex + +isReadingsCurrent;

    const currentReadings: Record<string, any> =
      (isReadingsCurrent ? device.readings![0] : emptyReadingsObject) || {};
    const prevReadings: Record<string, any> =
      device.readings![prevReadingsIndex] || {};

    for (let i = 1; i <= numberOfReadings; i++) {
      previousReadingsArray.push(prevReadings[`value${i}`] ?? '');
      currentReadingsArray.push(currentReadings[`value${i}`] ?? '');
    }

    setReadingsState({
      previousReadingsArray,
      currentReadingsArray,
      prevId: prevReadings.id,
      currId: currentReadings.id,
      resource: device.resource,
    });
  }, [device.readings, sliderIndex]);

  useEffect(() => {
    const previousReadingsArray: number[] = [];

    const prevReadingsIndex = sliderIndex + +isReadingsCurrent;

    const prevReadings: Record<string, any> =
      device.readings![prevReadingsIndex] || {};

    for (let i = 1; i <= numberOfReadings; i++) {
      previousReadingsArray.push(prevReadings[`value${i}`] ?? '');
    }

    setPreviousReadings({
      ...previousReadingsArray.reduce(
        (acc, current, index) => ({ ...acc, [index]: current }),
        {}
      ),
    });
  }, [device.readings, sliderIndex]);

  const formDeviceReadingObject = (
    deviceItem: IndividualDeviceListItemResponse,
    readingsState: ReadingsStateType
  ): ReadingType => {
    const readingData = {
      deviceId: deviceItem.id,
      ...readingsState.currentReadingsArray.filter(Boolean).reduce(
        (acc, elem, index) => ({
          ...acc,
          [`value${index + 1}`]: Number(elem),
        }),
        {}
      ),
      readingDate: moment().toISOString(),
      uploadTime: moment().toISOString(),
      isForced: true,
    };

    return readingData;
  };

  const sendReadings = useCallback(() => {
    if (!readingsState) return;
    const deviceReadingObject: Record<string, any> = formDeviceReadingObject(
      device,
      readingsState
    );
    axios.post('/IndividualDeviceReadings/create', deviceReadingObject);
    setInitialReadings(readingsState.currentReadingsArray);
  }, [readingsState]);

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node) || !readingsState)
        return;

      if (readingsState.currentReadingsArray !== initialReadings) {
        sendReadings();
      }
      dispatch(setInputUnfocused());
    },
    [readingsState, initialReadings]
  );

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node) || !readingsState)
        return;

      setInitialReadings(readingsState.currentReadingsArray);
      const isNull = isNullInArray(readingsState.currentReadingsArray);
      if (isNull) {
      }
    },
    [readingsState]
  );

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();

    const value =
      e.type === 'focus'
        ? e.target.value === '0'
          ? ''
          : e.target.value
        : e.target.value;

    setReadingsState((state: any) => ({
      ...state,
      currentReadingsArray: state.currentReadingsArray.map(
        (reading: any, i: any): number => {
          return i === index ? value : reading;
        }
      ),
    }));
  };

  const onChangePreviousReading = (value: string, index: number) => {
    setPreviousReadings((prev) => ({ ...prev, [index]: value }));
  };

  if (!readingsState) return {};

  const currentDeviceReadings = readingsState.currentReadingsArray.map(
    (value, index) => (
      <ReadingsBlock
        key={device.id + index}
        index={index}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInputChange(e, index)
        }
        value={value}
        resource={readingsState.resource}
        operatorCabinet
      />
    )
  );

  const previousDeviceReadings = toArray<number>(previousReadings, false).map(
    (value, index) => (
      <ReadingsBlock
        key={device.id + index + '-prev-readings'}
        index={index}
        value={value}
        operatorCabinet
        resource={readingsState.resource}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();

          onChangePreviousReading(
            e.type === 'focus' ? '' : e.target.value,
            index
          );
        }}
      />
    )
  );

  const options = (
    readingsElems: JSX.Element[],
    isCurrent: boolean
  ): OptionsInterface[] => [
    {
      value: () => (
        <DeviceReadingsContainer
          color={isCurrent ? getInputColor(device.resource) : 'var(--main-90)'}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          resource={device.resource}
        >
          {readingsElems}
        </DeviceReadingsContainer>
      ),
      isSuccess:
        readingsState?.resource !== 'Electricity' || readingsElems.length === 1,
    },
    {
      value: () => (
        <div
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DeviceReadingsContainer
            style={{ marginBottom: 8 }}
            color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
            resource={device.resource}
          >
            {readingsElems[0]}
          </DeviceReadingsContainer>
          <DeviceReadingsContainer
            color={isCurrent ? '#957400' : 'var(--main-90)'}
            resource={device.resource}
          >
            {readingsElems[1]}
          </DeviceReadingsContainer>
        </div>
      ),
      isSuccess: readingsElems.length === 2,
    },
    {
      value: () => (
        <div
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DeviceReadingsContainer
            style={{ marginBottom: 8 }}
            color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
            resource={device.resource}
          >
            {[readingsElems[0], readingsElems[1]]}
          </DeviceReadingsContainer>
          <DeviceReadingsContainer
            color={isCurrent ? '#957400' : 'var(--main-90)'}
            resource={device.resource}
          >
            {readingsElems[2]}
          </DeviceReadingsContainer>
        </div>
      ),
      isSuccess: true,
    },
  ];

  const previousResultReadings = options(previousDeviceReadings, false)
    .find((el) => el.isSuccess)!
    .value();

  const currentReadings = options(currentDeviceReadings, true)
    .find((el) => el.isSuccess)!
    .value();

  return {
    readingsState, // стейт с показаниями
    previousReadings: previousResultReadings, // массив компонентов с показаниями за пред. месяцы
    currentReadings, // массив компонентов с показаниями за текущий месяц с возможностью ввода
  };
};

export type ReadingsStateType = {
  previousReadingsArray: number[];
  currentReadingsArray: number[];
  prevId: number;
  currId: number;
  resource: string;
};

type ReadingType = {
  deviceId: number;
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  readingDate: string;
  uploadTime: string;
  isForced: boolean;
};

interface OptionsInterface {
  value: () => JSX.Element;
  isSuccess: boolean;
}
