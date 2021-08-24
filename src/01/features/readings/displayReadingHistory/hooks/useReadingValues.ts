import { useParams } from 'react-router-dom';
import { refetchReadingHistory } from './../models/index';
import { createReading } from './../../../../_api/readings';
import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from './../../../../../myApi';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $readingHistory } from '../models';

export type RequestStatusShared = 'pending' | 'done' | 'failed' | null;

export function useReadingHistoryValues() {
  const [
    bufferedValues,
    setBufferedValues,
  ] = useState<IndividualDeviceReadingsHistoryResponse | null>();

  const params = useParams<{ deviceId: string }>();

  const { deviceId } = params;

  const [uploadingReadingsStatuses, setUploadingReadingsStatuses] = useState<{
    [key: string]: RequestStatusShared;
  }>({});

  const initialValues = useStore($readingHistory);

  useEffect(() => {
    setBufferedValues(initialValues);
  }, [initialValues]);

  const setFieldValue = (
    value: string,
    address: { year: number; month: number; date: string; index: number }
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
                              elem.readingDate === address.date
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

  async function uploadReading(reading: IndividualDeviceReadingsCreateRequest) {
    const id = reading.readingDate;

    console.log(reading);

    setReadingUploadRequestStatus(id, 'pending');

    try {
      await createReading(reading);
      refetchReadingHistory(Number(deviceId));

      setReadingUploadRequestStatus(id, 'done');
    } catch (e) {
      setReadingUploadRequestStatus(id, 'failed');
    }
  }

  return {
    values: bufferedValues,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
  };
}
