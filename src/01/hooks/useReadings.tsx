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
import ReadingsBlock, {
  getMeasurementUnit,
} from '../_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import {
  EIndividualDeviceRateType,
  EIndividualDeviceReadingsSource,
  EResourceType,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
  IndividualDeviceReadingsCreateRequest,
} from '../../myApi';
import {
  getDateByReadingMonthSlider,
  getPreviousReadingsMonth,
} from '01/shared/lib/readings/getPreviousReadingsMonth';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Wide } from '01/shared/ui/FilesUpload';
import styled from 'styled-components';
import { message, Tooltip } from 'antd';
import { refetchIndividualDevices } from '01/features/individualDevices/displayIndividualDevices/models';
import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { openConfirmReadingModal } from '01/features/readings/readingsInput/confirmInputReadingModal/models';

export const useReadings = (
  device: IndividualDeviceListItemResponse,
  sliderIndex = 0,
  numberOfPreviousReadingsInputs?: number,
  closed?: boolean
) => {
  const unit = getMeasurementUnit(device.resource);

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

  const setInitialData = (sliderIndex: number) => {
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
      previousReadingsArray.push(prevReadings[`value${i}`] || '');
      currentReadingsArray.push(currentReadings[`value${i}`] || '');
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
  };

  useEffect(() => {
    setInitialData(sliderIndex);
  }, [device.readings, sliderIndex]);

  useEffect(() => {
    getArrayByCountRange(11, () => '').forEach((_, index) => {
      setInitialData(index);
    });
  }, [device.readings]);

  function setReadingArchived(id: number, readingDate: string) {
    const request = async () => {
      try {
        await axios.post(`IndividualDeviceReadings/${id}/remove`);

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

    openConfirmReadingModal({
      title: `Вы точно хотите удалить показание за ${readingDate.toLowerCase()} на приборе ${
        device.model
      } (${device.serialNumber})?`,
      callback: () => void request(),
    });
  }

  const formDeviceReadingObject = (
    deviceItem: IndividualDeviceListItemResponse,
    readingsState: ReadingsStateType
  ): ReadingType => {
    const readingData = {
      deviceId: deviceItem.id,
      ...readingsState.currentReadingsArray
        .filter(Boolean)
        .reduce((acc, elem, index) => {
          console.log(elem);

          return {
            ...acc,
            [`value${index + 1}`]: Number(elem),
          };
        }, {}),
      readingDate: moment().toISOString(true),
      uploadTime: moment().toISOString(true),
      isForced: true,
    };

    return readingData;
  };

  const sendPreviousReading = async (requestPayload: any) => {
    const values = getReadingValuesArray(
      requestPayload,
      getIndividualDeviceRateNumByName(device.rateType)
    );

    if (values.some(Boolean)) return;

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
            uploadTime: moment(res.uploadTime).toISOString(true),
            source: res.source,
            user: res.user,
            id: res.id,
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

  const sendPreviousReadingController = async (
    neededPreviousReadings: ReadingElem,
    index: number
  ) => {
    const isExistPreviousReadingValues = Boolean(
      neededPreviousReadings?.values?.length
    );
    const isExistReadingState = Boolean(readingsState);
    const isExistNeededPreviousReadingId = neededPreviousReadings.id;

    if (!isExistPreviousReadingValues || !isExistReadingState) return;

    if (
      !neededPreviousReadings?.values.some(Boolean) &&
      isExistNeededPreviousReadingId
    )
      return setReadingArchived(
        neededPreviousReadings.id,
        getPreviousReadingsMonth(sliderIndex)
      );

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
      readingDate: getDateByReadingMonthSlider(sliderIndex).toISOString(true),
    };

    const {
      validated,
      valuesValidationResults,
      limit,
    } = isCorrectReadingValues(
      device.resource,
      device.rateType,
      readingsState?.previousReadings[sliderIndex]?.values || [],
      getNextPreviousReading(readingsState?.previousReadings!, sliderIndex)
        ?.values || [],
      index
    );

    if (validated) {
      await sendPreviousReading(requestPayload);
    } else {
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

      const neededValueWarning = valuesValidationResults?.find((elem) =>
        Boolean(elem.type)
      );

      if (neededValueWarning?.type === 'down') {
        const failedReadingValidateResult = valuesValidationResults?.find(
          (elem) => !elem.validated
        );

        openConfirmReadingModal({
          title: (
            <>
              Введенное показание по прибору <b>{device.serialNumber}</b> (
              {device.model}) меньше предыдущего на T
              {failedReadingValidateResult?.index}:{' '}
              <b>
                {Math.abs(
                  round(failedReadingValidateResult?.difference || 0, 3)
                )}{' '}
                {unit}{' '}
              </b>
            </>
          ),
          callback: () => void sendPreviousReading(requestPayload),
        });
        return;
      }

      openConfirmReadingModal({
        title: `${
          neededValueWarning?.type === 'up'
            ? `Расход ${round(
                neededValueWarning.difference,
                3
              )}${unit}, больше чем лимит ${limit}${unit}`
            : ''
        }`,
        callback: () => void sendPreviousReading(requestPayload),
      });
    }

    return;
  };

  const sendCurrentReadingController = async (index: number) => {
    if (!readingsState) return;

    const deviceReadingObject: Record<string, any> = formDeviceReadingObject(
      device,
      readingsState
    );

    if (!readingsState.currentReadingsArray?.some(Boolean)) {
      if (!readingsState.currentReadingId) return;

      return setReadingArchived(
        readingsState.currentReadingId,
        getPreviousReadingsMonth(-1)
      );
    }

    const sendCurrentReadings = async () => {
      const values = getReadingValuesArray(
        deviceReadingObject as any,
        getIndividualDeviceRateNumByName(device.rateType)
      );

      console.log(values);

      if (!values.every(Boolean)) return;

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
          uploadTime: moment(res.uploadDate).toISOString(true),
          source: res.source,
          user: res.user,
          currentReadingId: res.id || prev.currentReadingId,
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

    const {
      validated,
      valuesValidationResults,
      limit,
    } = isCorrectReadingValues(
      device.resource,
      device.rateType,
      readingsState.currentReadingsArray,
      getNextPreviousReading(readingsState.previousReadings, sliderIndex - 1)
        ?.values || [],
      index
    );

    if (validated) {
      await sendCurrentReadings();
    } else {
      setReadingsState((prev: any) => ({
        ...prev,
        status: 'failed',
      }));

      const neededValueWarning = valuesValidationResults?.find(
        (elem) => !elem.validated
      );

      if (neededValueWarning?.type === 'down') {
        openConfirmReadingModal({
          title: (
            <>
              Введенное показание по прибору <b>{device.serialNumber}</b> (
              {device.model}) меньше предыдущего на T{neededValueWarning?.index}
              :{' '}
              <b>
                {Math.abs(round(neededValueWarning?.difference || 0, 3))} {unit}{' '}
              </b>
            </>
          ),
          callback: () => void sendCurrentReadings(),
        });
        return;
      }

      openConfirmReadingModal({
        title: `${
          neededValueWarning?.type === 'up'
            ? `Расход ${round(
                neededValueWarning.difference,
                3
              )}${unit}, больше чем лимит ${limit}${unit}`
            : ''
        }`,
        callback: () => void sendCurrentReadings(),
      });
    }

    return;
  };

  const sendReadings = async (isPrevious: boolean, index: number) => {
    try {
      if (!readingsState) return;

      const neededPreviousReadings =
        readingsState.previousReadings[sliderIndex];

      if (isPrevious) {
        sendPreviousReadingController(neededPreviousReadings, index);
      } else {
        sendCurrentReadingController(index);
      }
    } catch (e) {}
  };

  const onEnterHandler = useCallback(
    (
      e: React.FocusEvent<HTMLDivElement>,
      isPrevious: boolean,
      index: number
    ) => {
      if (!readingsState) return;

      if (
        isPrevious &&
        initialPreviousReadingState[sliderIndex]?.values !==
          readingsState.previousReadings[sliderIndex]?.values
      ) {
        sendReadings(isPrevious, index);

        return;
      }

      if (readingsState.currentReadingsArray !== initialReadings) {
        sendReadings(isPrevious, index);
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
          lineIndex={
            numberOfPreviousReadingsInputs &&
            numberOfPreviousReadingsInputs + index
          }
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
            onFocus={onFocusHandler}
            resource={device.resource}
          >
            {
              readingsElems.map((elem, index) => (
                <div
                  onKeyDown={fromEnter((e) =>
                    onEnterHandler(e, !isCurrent, index)
                  )}
                >
                  {elem.elem}
                </div>
              ))[0]
            }
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
            onFocus={onFocusHandler}
            resource={device.resource}
          >
            {
              readingsElems.map((elem, index) => (
                <div
                  onKeyDown={fromEnter((e) =>
                    onEnterHandler(e, !isCurrent, index)
                  )}
                >
                  {elem.elem}
                </div>
              ))[0]
            }
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
          onFocus={onFocusHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DeviceReadingsContainer
            style={{ marginBottom: 8 }}
            color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
            resource={device.resource}
          >
            {
              readingsElems.map((elem, index) => (
                <div
                  onKeyDown={fromEnter((e) =>
                    onEnterHandler(e, !isCurrent, index)
                  )}
                >
                  {elem.elem}
                </div>
              ))[0]
            }
          </DeviceReadingsContainer>
          <DeviceReadingsContainer
            color={isCurrent ? '#957400' : 'var(--main-90)'}
            resource={device.resource}
          >
            {
              readingsElems.map((elem, index) => (
                <div
                  onKeyDown={fromEnter((e) =>
                    onEnterHandler(e, !isCurrent, index)
                  )}
                >
                  {elem.elem}
                </div>
              ))[1]
            }
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
          onFocus={onFocusHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DeviceReadingsContainer
            style={{ marginBottom: 8 }}
            color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
            resource={device.resource}
          >
            {[
              readingsElems.map((elem, index) => (
                <div
                  onKeyDown={fromEnter((e) =>
                    onEnterHandler(e, !isCurrent, index)
                  )}
                >
                  {elem.elem}
                </div>
              ))[0],
              readingsElems.map((elem, index) => (
                <div
                  onKeyDown={fromEnter((e) =>
                    onEnterHandler(e, !isCurrent, index)
                  )}
                >
                  {elem.elem}
                </div>
              ))[1],
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

  const nextPreviousReading = getNextPreviousReading(
    readingsState.previousReadings,
    sliderIndex
  );
  const currentPreviousReading = readingsState.previousReadings[sliderIndex];

  const isExistCurrentPrevious = currentPreviousReading?.values.some(Boolean);
  const isExistNextPrevious = nextPreviousReading?.values?.some(Boolean);

  const previousReadingsWithTooltip = (
    <Tooltip
      title={
        !isExistCurrentPrevious && isExistNextPrevious
          ? getPreviousReadingTooltipString(
              nextPreviousReading?.values || [],
              device?.rateType,
              unit,
              nextPreviousReading?.index
            )
          : undefined
      }
    >
      {previousResultReadings}
    </Tooltip>
  );

  const isExistCurrentReading =
    readingsState.currentReadingsArray?.some(Boolean) && readingsState.source;

  const currentReadingsWithTooltip = (
    <Tooltip
      title={
        !isExistCurrentReading && isExistNextPrevious && !isExistCurrentPrevious
          ? getPreviousReadingTooltipString(
              nextPreviousReading?.values || [],
              device?.rateType,
              unit,
              nextPreviousReading?.index
            )
          : undefined
      }
    >
      {currentReadings}
    </Tooltip>
  );

  return {
    readingsState, // стейт с показаниями
    previousReadings: previousReadingsWithTooltip, // массив компонентов с показаниями за пред. месяцы
    currentReadings: currentReadingsWithTooltip, // массив компонентов с показаниями за текущий месяц с возможностью ввода
  };
};

const getPreviousReadingTooltipString = (
  readings: number[],
  rateType: EIndividualDeviceRateType,
  unit: string,
  sliderIndex?: number
) => {
  const rateNum = getIndividualDeviceRateNumByName(rateType);
  const valuesString = readings
    .reduce(
      (acc, elem, index) => (index + 1 > rateNum ? acc : [...acc, elem]),
      [] as number[]
    )
    .map(
      (elem, index) => `${rateNum === 1 ? '' : `T${index + 1}:`} ${elem}${unit}`
    )
    .join(', ');

  const month = sliderIndex && getPreviousReadingsMonth(sliderIndex);

  return `Последнее показание: ${valuesString} (${month})`;
};

const limits = {
  [EResourceType.ColdWaterSupply]: 25,
  [EResourceType.HotWaterSupply]: 15,
  [EResourceType.Electricity]: 1000,
};

export const getResourceUpLimit = (resource: EResourceType) => {
  return (limits as any)[resource] || Infinity;
};

export interface CorrectReadingValuesValidationResult {
  validated: boolean;
  valuesValidationResults?: {
    type: 'up' | 'down' | null;
    validated: boolean;
    index: number;
    difference: number;
    currentValue: number;
    prevValue: number;
  }[];
  limit?: number;
}

const isCorrectReadingValues = (
  resource: EResourceType,
  rateType: EIndividualDeviceRateType,
  nextReadings: number[],
  previousReadings: number[],
  currentIndex: number
): CorrectReadingValuesValidationResult => {
  if (!previousReadings.length) return { validated: true };

  const rateNum = getIndividualDeviceRateNumByName(rateType);
  const limit = getResourceUpLimit(resource);

  const res = nextReadings.reduce(
    (acc, elem, index) => {
      if (index + 1 > rateNum) return acc;

      const currentValue = Number(elem) || 0;
      const prevValue = Number(previousReadings[index]) || 0;

      const isDown = currentValue < prevValue;
      const isUp = currentValue - prevValue > limit;
      const type: 'up' | 'down' | null = isUp ? 'up' : isDown ? 'down' : null;
      const difference = currentValue - prevValue;

      const validated =
        currentIndex >= index
          ? acc.validated && !isDown && !isUp
          : acc.validated;

      return {
        ...acc,
        validated,
        valuesValidationResults: [
          ...(acc.valuesValidationResults || []),
          {
            validated,
            index: index + 1,
            type,
            difference,
            currentValue,
            prevValue,
          },
        ],
      };
    },
    { validated: true, limit } as CorrectReadingValuesValidationResult
  );

  return res;
};

export const getNextPreviousReading = (
  readings: PreviousReadingState,
  sliderIndex: number
) => {
  const readingsLength = Object.entries(readings).length;
  let index = sliderIndex;
  let res: ReadingElem | null = null;

  while (true) {
    index++;

    if (readings[index]?.values?.some(Boolean)) {
      res = readings[index];
      break;
    }

    if (index > readingsLength) break;
  }

  return res && { ...res, index };
};

interface ReadingElem {
  values: number[];
  date: string | null;
  uploadTime?: string;
  source?: EIndividualDeviceReadingsSource;
  user?: any;
  id: number;
  status?: RequestStatusShared;
}

interface PreviousReadingState {
  [key: number]: ReadingElem;
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

export function round(x: number, n: number) {
  if (!x) return x;

  const m = Math.pow(10, n);
  return Math.round(x * m) / m;
}

function getReadingValuesArray(
  payload: IndividualDeviceReadingsCreateRequest,
  deviceRateNum: number
) {
  const res: number[] = [];

  for (let i = 1; i <= deviceRateNum; i++) {
    const value = (payload as any)[`value${i}`];

    res.push(value);
  }

  return res;
}
