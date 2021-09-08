import React, { useCallback, useEffect, useState } from 'react';
import rateTypeToNumber from '../_api/utils/rateTypeToNumber';
import { formEmptyReadingsObject } from '../utils/formEmptyReadingsObject';
import { getMonthFromDate } from '../utils/getMonthFromDate';
import moment from 'moment';
import axios from '../axios';
import {
  DeviceReadingsContainer,
  getInputColor,
} from '../_pages/MetersPage/components/MeterDevices/components/ApartmentReadingLine';
import ReadingsBlock from '../_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import {
  EIndividualDeviceRateType,
  EIndividualDeviceReadingsSource,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from '../../myApi';
import {
  getDateByReadingMonthSlider,
  getPreviousReadingsMonth,
} from '01/shared/lib/readings/getPreviousReadingsMonth';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Wide } from '01/shared/ui/FilesUpload';
import styled from 'styled-components';
import { message } from 'antd';
import { refetchIndividualDevices } from '01/features/individualDevices/displayIndividualDevices/models';
import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import confirm from 'antd/lib/modal/confirm';

export const useReadings = (
  device: IndividualDeviceListItemResponse,
  sliderIndex = 0,
  numberOfPreviousReadingsInputs?: number,
  closed?: boolean
) => {
  const [readingsState, setReadingsState] = useState<ReadingsStateType>();
  const [initialReadings, setInitialReadings] = useState<number[]>([]);
  const [
    initialPreviousReadingState,
    setInitialPreviousReadingState,
  ] = useState<PreviousReadingState>({});

  const numberOfReadings = rateTypeToNumber(device.rateType);
  const emptyReadingsObject = formEmptyReadingsObject(numberOfReadings);

  const currentDate = moment();

  const currentMonth = getMonthFromDate();

  const isReadingsCurrent =
    currentMonth === getMonthFromDate(device.readings![0]?.readingDateTime) &&
    currentDate.diff(device.readings![0]?.readingDateTime, 'months') < 11;

  useEffect(() => {
    setReadingsState(undefined);
  }, [device]);

  useEffect(() => {
    const previousReadingsArray: number[] = [];
    const currentReadingsArray: number[] = [];

    const preparedReadingsArrWithEmpties = device.readings?.reduce(
      (acc, elem) => {
        if (currentDate.diff(elem.readingDateTime, 'months') > 11) return acc;

        const index =
          Number(moment().format('M')) -
          Number(moment(elem.readingDateTime).format('M')) -
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
              date: prevReadings.readingDateTime || null,
              uploadTime: prevReadings.uploadTime,
              source: prevReadings.source,
              user: prevReadings.user,
              id: prevReadings.id,
              status: prevReadings.status,
            },
      };

      setInitialPreviousReadingState(previousReadings);
      setInitialReadings(prev?.currentReadingsArray || currentReadingsArray);

      return {
        previousReadings,
        previousReadingsArray,
        currentReadingsArray:
          prev?.currentReadingsArray || currentReadingsArray,
        prevId: prevReadings.id,
        currId: currentReadings.id,
        resource: device.resource,
        uploadTime: currentReadings.uploadTime,
        source: currentReadings.source,
        user: currentReadings.user,
        currentReadingId: currentReadings.id,
        status: prev?.status,
      };
    });
  }, [device.readings, sliderIndex]);

  function setReadingArchived(id: number, readingDate: string) {
    const request = async () => {
      try {
        await axios.post(`IndividualDeviceReadings/${id}/setArchived`);

        refetchIndividualDevices();

        message.info(
          `Показание за ${readingDate.toLowerCase()} на приборе ${
            device.model
          } (${device.serialNumber}) было удалено`,
          4.5
        );
      } catch (error) {
        message.error('Не удалось удалить показание');
      }
    };

    confirm({
      okText: 'Да',
      cancelText: 'Отмена',
      onOk: request,
      title: `Вы точно хотите удалить показание за ${readingDate.toLowerCase()} на приборе ${
        device.model
      } (${device.serialNumber})?`,
    });
  }

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
      try {
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

          if (
            !neededPreviousReadings ||
            !neededPreviousReadings?.values?.length
          )
            return;

          if (!neededPreviousReadings?.values.some(Boolean)) {
            if (!neededPreviousReadings.id) return;

            return setReadingArchived(
              neededPreviousReadings.id,
              getPreviousReadingsMonth(sliderIndex)
            );
          }

          const requestPayload = {
            ...neededPreviousReadings?.values
              .slice(0, getIndividualDeviceRateNumByName(device.rateType))
              .reduce(
                (acc: object, value: number, index: number) => ({
                  ...acc,
                  [`value${index + 1}`]: Number(value),
                }),
                {}
              ),
            isForced: true,
            deviceId: device.id,
            readingDate: neededPreviousReadings.date,
          };

          const sendPreviousReading = async () => {
            setReadingsState((prev: any) => ({
              ...prev,
              previousReadings: {
                ...prev.previousReadings,
                [sliderIndex]: {
                  ...prev.previousReadings[sliderIndex],
                  status: 'pending',
                },
              },
            }));

            try {
              const res: any = await axios.post(
                '/IndividualDeviceReadings/createLite',
                requestPayload
              );

              setReadingsState((prev: any) => ({
                ...prev,
                previousReadings: {
                  ...prev.previousReadings,
                  [sliderIndex]: {
                    ...prev.previousReadings[sliderIndex],
                    uploadTime: moment(res.uploadTime).toISOString(),
                    source: res.source,
                    user: res.user,
                    id: res.readingId,
                    status: 'done',
                  },
                },
              }));
            } catch (error) {
              setReadingsState((prev: any) => ({
                ...prev,
                previousReadings: {
                  ...prev.previousReadings,
                  [sliderIndex]: {
                    ...prev.previousReadings[sliderIndex],
                    status: 'failed',
                  },
                },
              }));
              message.error('Не удалось сохранить показания, попробуйте позже');
              throw error;
            }

            return;
          };

          // if (rea)
          return await sendPreviousReading();
        }

        const deviceReadingObject: Record<
          string,
          any
        > = formDeviceReadingObject(device, readingsState);

        if (!readingsState.currentReadingsArray?.some(Boolean)) {
          if (!readingsState.currentReadingId) return;

          return setReadingArchived(
            readingsState.currentReadingId,
            getPreviousReadingsMonth(-1)
          );
        }

        const sendCurrentReadings = async () => {
          setReadingsState((prev: any) => ({
            ...prev,
            status: 'pending',
          }));

          try {
            const res: any = await axios.post(
              '/IndividualDeviceReadings/createLite',
              deviceReadingObject
            );

            setReadingsState((prev: any) => ({
              ...prev,
              uploadTime: moment(res.uploadDate).toISOString(),
              source: res.source,
              user: res.user,
              currentReadingId: res.readingId || prev.currentReadingId,
              status: 'done',
            }));

            setInitialReadings(readingsState.currentReadingsArray);
          } catch (error) {
            setReadingsState((prev: any) => ({
              ...prev,
              status: 'failed',
            }));

            message.error('Не удалось сохранить показания, попробуйте позже');
            throw error;
          }
        };

        return await sendCurrentReadings();
      } catch (e) {}
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

      if (
        readingsState.currentReadingsArray.join('') !== initialReadings.join('')
      ) {
        sendReadings();
      }
    },
    [readingsState, initialReadings]
  );

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {},
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
          closed={closed}
          user={readingsState.user}
          source={readingsState.source}
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
          status={readingsState.status}
        />
      ),
      value,
    })
  );

  const previousDeviceReadings =
    readingsState.previousReadings[sliderIndex]?.values.map((value, index) => ({
      elem: (
        <ReadingsBlock
          closed={closed}
          user={readingsState.previousReadings[sliderIndex].user}
          key={device.id + index + '-prev-readings'}
          index={index}
          value={value}
          source={readingsState.previousReadings[sliderIndex].source}
          operatorCabinet
          resource={readingsState.resource}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onInputChange(e, index, true);
          }}
          status={readingsState.previousReadings[sliderIndex]?.status}
        />
      ),
      value,
    })) || [];

  const fromEnter = (callback: (e: any) => void) => (e: any) => {
    if (e?.key === 'Enter') callback(e);
  };

  const options = (
    readingsElems: { elem: JSX.Element; value: number }[],
    isCurrent: boolean,
    uploadTime?: string
  ): OptionsInterface[] => [
    {
      value: () => (
        <div>
          <DeviceReadingsContainer
            color={
              isCurrent ? getInputColor(device.resource) : 'var(--main-90)'
            }
            onBlur={(e) => onBlurHandler(e, !isCurrent)}
            onFocus={onFocusHandler}
            resource={device.resource}
          >
            {readingsElems.map((elem) => elem.elem)[0]}
          </DeviceReadingsContainer>
        </div>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.None,
    },
    {
      value: () => (
        <Wide>
          <DeviceReadingsContainer
            color={
              isCurrent ? getInputColor(device.resource) : 'var(--main-90)'
            }
            onKeyDown={fromEnter((e) => onBlurHandler(e, !isCurrent))}
            onFocus={onFocusHandler}
            resource={device.resource}
          >
            {readingsElems.map((elem) => elem.elem)[0]}
          </DeviceReadingsContainer>
          <ReadingUploadDate>
            {(uploadTime && moment(uploadTime).format('DD.MM.YYYY')) ||
              'Нет показаний'}
          </ReadingUploadDate>
        </Wide>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.OneZone,
    },
    {
      value: () => (
        <div
          onKeyDown={fromEnter((e) => onBlurHandler(e, !isCurrent))}
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
          <ReadingUploadDate>
            {(uploadTime && moment(uploadTime).format('DD.MM.YYYY')) ||
              'Нет показаний'}
          </ReadingUploadDate>
        </div>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.TwoZone,
    },
    {
      value: () => (
        <div
          onKeyDown={fromEnter((e) => onBlurHandler(e, !isCurrent))}
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
          <ReadingUploadDate>
            {(uploadTime && moment(uploadTime).format('DD.MM.YYYY')) ||
              'Нет показаний'}
          </ReadingUploadDate>
        </div>
      ),
      isSuccess: device.rateType === EIndividualDeviceRateType.ThreeZone,
    },
  ];

  const previousResultReadings = options(
    previousDeviceReadings,
    false,
    readingsState.previousReadings[sliderIndex]?.uploadTime
  )
    .find((el) => el.isSuccess)!
    .value();

  const currentReadings = options(
    currentDeviceReadings,
    true,
    readingsState.uploadTime
  )
    .find((el) => el.isSuccess)!
    .value();

  return {
    readingsState, // стейт с показаниями
    previousReadings: previousResultReadings, // массив компонентов с показаниями за пред. месяцы
    currentReadings, // массив компонентов с показаниями за текущий месяц с возможностью ввода
  };
};

interface PreviousReadingState {
  [key: number]: {
    values: number[];
    date: string | null;
    uploadTime?: string;
    source?: EIndividualDeviceReadingsSource;
    user?: any;
    id: number;
    status?: RequestStatusShared;
  };
}

export type ReadingsStateType = {
  previousReadingsArray: number[];
  previousReadings: PreviousReadingState;
  currentReadingsArray: number[];
  currentReadingId: number;
  prevId: number;
  currId: number;
  resource: string;
  uploadTime?: string;
  source?: EIndividualDeviceReadingsSource;
  user?: any;
  status?: RequestStatusShared;
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

const ReadingUploadDate = styled(Flex)`
  justify-content: flex-end;
  color: #929292;
  margin-top: 2px;
`;
