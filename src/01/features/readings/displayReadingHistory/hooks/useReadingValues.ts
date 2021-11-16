import { $individualDevice } from '01/features/individualDevices/displayIndividualDevice/models';
import { getReadingValuesArray } from './../utils';
import { useParams } from 'react-router-dom';
import {
  fetchReadingHistoryFx,
  refetchReadingHistory,
} from './../models/index';
import { createReading } from './../../../../_api/readings';
import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from './../../../../../myApi';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $readingHistory } from '../models';
import rateTypeToNumber from '01/_api/utils/rateTypeToNumber';

export type RequestStatusShared = 'pending' | 'done' | 'failed' | null;

export function useReadingHistoryValues() {
  const [
    bufferedValues,
    setBufferedValues,
  ] = useState<IndividualDeviceReadingsHistoryResponse | null>();

  const params = useParams<{ deviceId: string }>();

  const { deviceId } = params;

  const device = useStore($individualDevice);

  const [uploadingReadingsStatuses, setUploadingReadingsStatuses] = useState<{
    [key: string]: RequestStatusShared;
  }>({});

  const initialValues = useStore($readingHistory);

  useEffect(() => {
    setBufferedValues(initialValues);
  }, [initialValues]);

  const setFieldValue = (
    value: string,
    address: { year: number; month: number; id: number | null; index: number }
  ) => {
    setBufferedValues((prev) => ({
      ...prev,
      yearReadings:
        prev?.yearReadings?.map((year) =>
          year.year === address.year
            ? {
                ...year,
                monthReadings:
                  year.monthReadings?.map((month) =>
                    month.month === address.month
                      ? {
                          ...month,
                          readings:
                            month.readings?.map((elem) =>
                              elem.id === address.id
                                ? { ...elem, [`value${address.index}`]: value }
                                : elem
                            ) || [],
                        }
                      : month
                  ) || [],
              }
            : year
        ) || [],
    }));
  };

  const setReadingUploadRequestStatus = (
    id: string,
    status: RequestStatusShared
  ) =>
    setUploadingReadingsStatuses((prev) => ({
      ...prev,
      [id]: status,
    }));

  async function uploadReading(
    reading: IndividualDeviceReadingsCreateRequest,
    address: { year: number; month: number; id: number }
  ) {
    const current = getReadingValuesArray(
      reading as any,
      'value',
      rateTypeToNumber(device?.rateType!)
    ).join('');

    const prev = getReadingValuesArray(
      initialValues &&
        (initialValues.yearReadings
          ?.find((elem) => elem.year === address.year)
          ?.monthReadings?.find((elem) => elem.month === address.month)
          ?.readings?.find((elem) => elem.id === address.id) as any),
      'value',
      rateTypeToNumber(device?.rateType!)
    )
      .map((elem) => elem?.split(' ')[0])
      .join('');

    // проверка на изменение значений, если изменились, то инициируется отправка данных
    if (current === prev) return;

    const id = reading.readingDate;

    setReadingUploadRequestStatus(id, 'pending');

    try {
      await createReading(reading);
      refetchReadingHistory(Number(deviceId));

      setReadingUploadRequestStatus(id, 'done');
    } catch (e) {
      setReadingUploadRequestStatus(id, 'failed');
    }
  }

  const pendingHistory = useStore(fetchReadingHistoryFx.pending);

  useEffect(() => {
    if (!pendingHistory) return;

    setUploadingReadingsStatuses((prevState) => {
      const prev = { ...prevState };

      for (const key in prev) {
        if (prev[key] === 'done') delete prev[key];
      }

      return prev;
    });
  }, [pendingHistory]);

  return {
    values: bufferedValues,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
  };
}
