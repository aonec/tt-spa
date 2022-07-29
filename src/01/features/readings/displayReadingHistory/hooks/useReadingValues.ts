import { useParams } from 'react-router-dom';
import {
  fetchReadingHistoryFx,
  refetchReadingHistory,
} from './../models/index';
import { createReading } from './../../../../_api/readings';

import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $readingHistory } from '../models';
import moment from 'moment';
import _ from 'lodash/fp';
import { IndividualDeviceReadingsCreateRequest, IndividualDeviceReadingsHistoryResponse } from '../../../../../api/types';
import { axios } from '../../../../../api/axios';

export type RequestStatusShared = 'pending' | 'done' | 'failed' | null;

export function useReadingHistoryValues() {
  const [
    bufferedValues,
    setBufferedValues,
  ] = useState<IndividualDeviceReadingsHistoryResponse | null>();

  const params = useParams<{ deviceId: string }>();

  const { deviceId } = params;

  const [uploadingReadingsStatuses, setUploadingReadingsStatuses] = useState<{
    [date: string]: RequestStatusShared;
  }>({});

  const initialValues = useStore($readingHistory);

  useEffect(() => {
    setBufferedValues(initialValues);
  }, [initialValues]);

  async function deleteReading(id: number) {
    try {
      await axios.post(`IndividualDeviceReadings/${id}/remove`);
      refetchReadingHistory(Number(deviceId));
    } catch (error) {}
  }

  const resetValue = (address: {
    year: number;
    month: number;
    id: number | null;
  }) => {
    const initialValue = _.pipe([
      _.getOr([], 'yearReadings'),
      _.find({ year: address.year }),
      _.getOr([], 'monthReadings'),
      _.find({ month: address.month }),
      _.getOr([], 'readings'),
      _.find({ id: address.id }),
    ])(initialValues);

    const yearIndex = _.findIndex({ year: address.year })(
      bufferedValues?.yearReadings
    );
    const monthIndex = _.findIndex({ month: address.month })(
      bufferedValues?.yearReadings?.[yearIndex].monthReadings
    );
    const readingIndex = _.findIndex({ id: address.id })(
      bufferedValues?.yearReadings?.[yearIndex].monthReadings?.[monthIndex]
        .readings
    );
    const setInitValue = _.assoc(
      [
        'yearReadings',
        `${yearIndex}`,
        'monthReadings',
        `${monthIndex}`,
        'readings',
        `${readingIndex}`,
      ],
      initialValue
    );

    setBufferedValues((prev) => prev && setInitValue(prev));
  };

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

  async function uploadReading(reading: IndividualDeviceReadingsCreateRequest) {
    const date = moment(reading.readingDate);
    const dateString = `${date.month() + 2}.${date.year()}`;

    setUploadingReadingsStatuses((prev) => ({
      ...prev,
      [dateString]: 'pending',
    }));
    try {
      await createReading(reading);
      refetchReadingHistory(Number(deviceId));

      setUploadingReadingsStatuses((prev) => ({
        ...prev,
        [dateString]: 'done',
      }));
    } catch (e) {
      setUploadingReadingsStatuses((prev) => ({
        ...prev,
        [dateString]: 'failed',
      }));
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
    deleteReading,
    resetValue,
  };
}
