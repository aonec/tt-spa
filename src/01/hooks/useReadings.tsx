import React, { useCallback, useEffect, useState } from 'react';
import rateTypeToNumber from '../_api/utils/rateTypeToNumber';
import { formEmptyReadingsObject } from '../utils/formEmptyReadingsObject';
import { getMonthFromDate } from '../utils/getMonthFromDate';
import moment from 'moment';
import axios from '../axios';
import { isNullInArray } from '../utils/checkArrayForNulls';
import {
  DeviceReadingsContainer,
  getInputColor,
} from '../_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import ReadingsBlock from '../_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import {
  EIndividualDeviceRateType,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from '../../myApi';
import { getDateByReadingMonthSlider } from '01/shared/lib/readings/getPreviousReadingsMonth';

export const useReadings = (
  device: IndividualDeviceListItemResponse,
  sliderIndex = 0,
  numberOfPreviousReadingsInputs?: number
) => {
  const [readingsState, setReadingsState] = useState<ReadingsStateType>();
  const [initialReadings, setInitialReadings] = useState<number[]>([]);
  const [
    initialPreviousReadingState,
    setInitialPreviousReadingState,
  ] = useState<PreviousReadingState>({});

  const currentMonth = getMonthFromDate();
  const numberOfReadings = rateTypeToNumber(device.rateType);
  const emptyReadingsObject = formEmptyReadingsObject(numberOfReadings);
  const isReadingsCurrent =
    currentMonth === getMonthFromDate(device.readings![0]?.readingDate);

  useEffect(() => {
    const previousReadingsArray: number[] = [];
    const currentReadingsArray: number[] = [];

    const preparedReadingsArrWithEmpties = device.readings?.reduce(
      (acc, elem) => {
        const index =
          Number(moment().format('M')) -
          Number(moment(elem.readingDate).format('M')) -
          1;

        acc[index] = elem;

        return acc;
      },
      {} as { [key: number]: IndividualDeviceReadingsResponse }
    );

    const currentReadings: Record<string, any> =
      (isReadingsCurrent ? device.readings![0] : emptyReadingsObject) || {};

    const prevReadings: Record<string, any> =
      preparedReadingsArrWithEmpties![sliderIndex] || {};

    for (let i = 1; i <= 3; i++) {
      previousReadingsArray.push(prevReadings[`value${i}`] ?? '');
      currentReadingsArray.push(currentReadings[`value${i}`] ?? '');
    }

    setReadingsState((prev) => {
      const previousReadings = {
        ...prev?.previousReadings,
        [sliderIndex]: prev?.previousReadings[sliderIndex]
          ? prev?.previousReadings[sliderIndex]
          : {
              values: previousReadingsArray,
              date: prevReadings.readingDate || null,
            },
      };

      setInitialPreviousReadingState(previousReadings);

      return {
        previousReadings,
        previousReadingsArray,
        currentReadingsArray,
        prevId: prevReadings.id,
        currId: currentReadings.id,
        resource: device.resource,
      };
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

  const sendReadings = useCallback(
    async (isPrevious?: boolean) => {
      if (!readingsState) return;

      if (isPrevious) {
        const getReadings = (prev: ReadingsStateType) => {
          const date = getDateByReadingMonthSlider(sliderIndex).format(
            'YYYY-MM'
          );

          const res = prev && {
            ...prev,
            previousReadings: {
              ...prev?.previousReadings,
              [sliderIndex]: {
                ...prev?.previousReadings[sliderIndex],
                date:
                  prev?.previousReadings[sliderIndex].date || `${date}-${15}`,
              },
            },
          };

          setInitialPreviousReadingState(
            (prev) => res?.previousReadings || prev
          );

          return res;
        };

        const neededReadings = getReadings(readingsState);

        setReadingsState(neededReadings);

        const neededPreviousReadings =
          neededReadings.previousReadings[sliderIndex];

        if (!neededPreviousReadings || !neededPreviousReadings?.values?.length)
          return;

        await axios.post('/IndividualDeviceReadings/create', {
          ...neededPreviousReadings?.values.reduce(
            (acc: object, value: number, index: number) => ({
              ...acc,
              [`value${index + 1}`]: Number(value),
            }),
            {}
          ),
          isForced: true,
          deviceId: device.id,
          readingDate: neededPreviousReadings.date,
        });

        return;
      }

      const deviceReadingObject: Record<string, any> = formDeviceReadingObject(
        device,
        readingsState
      );

      await axios.post('/IndividualDeviceReadings/create', deviceReadingObject);

      setInitialReadings(readingsState.currentReadingsArray);
    },
    [readingsState]
  );

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLDivElement>, isPrevious?: boolean) => {
      if (!readingsState) return;

      if (
        isPrevious &&
        initialPreviousReadingState[sliderIndex]?.values.join() !==
          readingsState.previousReadings[sliderIndex]?.values.join()
      ) {
        sendReadings(isPrevious);

        return;
      }

      if (readingsState.currentReadingsArray !== initialReadings) {
        sendReadings();
      }
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
    index: number,
    isPrevious?: boolean
  ) => {
    e.preventDefault();

    const value =
      e.type === 'focus'
        ? e.target.value === '0'
          ? ''
          : e.target.value
        : e.target.value;

    if (isPrevious) {
      setReadingsState((prev) => {
        if (!prev) return prev;

        const newValues = [...prev.previousReadings[sliderIndex].values];

        newValues[index] = value as any;

        return {
          ...prev,
          previousReadings: {
            ...prev.previousReadings,
            [sliderIndex]: {
              ...prev.previousReadings[sliderIndex],
              values: newValues,
            },
          },
        };
      });

      return;
    }

    setReadingsState((state: any) => ({
      ...state,
      currentReadingsArray: state.currentReadingsArray.map(
        (reading: any, i: any): number => {
          return i === index ? value : reading;
        }
      ),
    }));
  };

  if (!readingsState) return {};

  const currentDeviceReadings = readingsState.currentReadingsArray.map(
    (value, index) => ({
      elem: (
        <ReadingsBlock
          key={device.id + index}
          index={index}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange(e, index)
          }
          value={value}
          resource={readingsState.resource}
          operatorCabinet
          isCurrent
          lineIndex={
            numberOfPreviousReadingsInputs &&
            numberOfPreviousReadingsInputs + index
          }
        />
      ),
      value,
    })
  );

  const previousDeviceReadings =
    readingsState.previousReadings[sliderIndex]?.values.map((value, index) => ({
      elem: (
        <ReadingsBlock
          key={device.id + index + '-prev-readings'}
          index={index}
          value={value}
          operatorCabinet
          resource={readingsState.resource}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onInputChange(e, index, true);
          }}
        />
      ),
      value,
    })) || [];

  const options = (
    readingsElems: { elem: JSX.Element; value: number }[],
    isCurrent: boolean
  ): OptionsInterface[] => [
    {
      value: () => (
        <DeviceReadingsContainer
          color={isCurrent ? getInputColor(device.resource) : 'var(--main-90)'}
          onBlur={(e) => onBlurHandler(e, !isCurrent)}
          onFocus={onFocusHandler}
          resource={device.resource}
        >
          {readingsElems.map((elem) => elem.elem)[0]}
        </DeviceReadingsContainer>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.None,
    },
    {
      value: () => (
        <DeviceReadingsContainer
          color={isCurrent ? getInputColor(device.resource) : 'var(--main-90)'}
          onBlur={(e) => onBlurHandler(e, !isCurrent)}
          onFocus={onFocusHandler}
          resource={device.resource}
        >
          {readingsElems.map((elem) => elem.elem)[0]}
        </DeviceReadingsContainer>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.OneZone,
    },
    {
      value: () => (
        <div
          onBlur={(e) => onBlurHandler(e, !isCurrent)}
          onFocus={onFocusHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DeviceReadingsContainer
            style={{ marginBottom: 8 }}
            color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
            resource={device.resource}
          >
            {readingsElems.map((elem) => elem.elem)[0]}
          </DeviceReadingsContainer>
          <DeviceReadingsContainer
            color={isCurrent ? '#957400' : 'var(--main-90)'}
            resource={device.resource}
          >
            {readingsElems.map((elem) => elem.elem)[1]}
          </DeviceReadingsContainer>
        </div>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.TwoZone,
    },
    {
      value: () => (
        <div
          onBlur={(e) => onBlurHandler(e, !isCurrent)}
          onFocus={onFocusHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DeviceReadingsContainer
            style={{ marginBottom: 8 }}
            color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
            resource={device.resource}
          >
            {[
              readingsElems.map((elem) => elem.elem)[0],
              readingsElems.map((elem) => elem.elem)[1],
            ]}
          </DeviceReadingsContainer>
          <DeviceReadingsContainer
            color={isCurrent ? '#957400' : 'var(--main-90)'}
            resource={device.resource}
          >
            {readingsElems.map((elem) => elem.elem)[2]}
          </DeviceReadingsContainer>
        </div>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.ThreeZone,
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

interface PreviousReadingState {
  [key: number]: { values: number[]; date: string | null };
}

export type ReadingsStateType = {
  previousReadingsArray: number[];
  previousReadings: PreviousReadingState;
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
