import { createReading } from './../../../../_api/readings';
import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from './../../../../../myApi';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $readingHistory } from '../models';

type Status = 'pending' | 'done' | 'failed' | null;

export function useReadingHistoryValues() {
  const [
    bufferedValues,
    setBufferedValues,
  ] = useState<IndividualDeviceReadingsHistoryResponse | null>();

  const [uploadingReadingsStatuses, setUploadingReadingsStatuses] = useState<{
    [key: string]: Status;
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

  const setReadingUploadRequestStatus = (id: string, status: Status) =>
    setUploadingReadingsStatuses((prev) => ({
      ...prev,
      [id]: status,
    }));

  async function onUploadReadingHandler(
    reading: IndividualDeviceReadingsCreateRequest
  ) {
    const id = reading.readingDate;

    setReadingUploadRequestStatus(id, 'pending');

    try {
      await createReading(reading);

      setReadingUploadRequestStatus(id, 'done');
    } catch (e) {
      setReadingUploadRequestStatus(id, 'failed');
    }
  }

  return {
    values: bufferedValues,
    setFieldValue,
    uploadingReadingsStatuses,
    onUploadReadingHandler,
  };
}
