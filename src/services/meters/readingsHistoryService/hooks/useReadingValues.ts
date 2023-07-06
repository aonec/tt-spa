import { useParams } from 'react-router-dom';
import { createReading } from '../../../../01/_api/readings';
import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from '../../../../myApi';
import { useStore } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import axios from '01/axios';
import moment from 'moment';
import _ from 'lodash/fp';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { readingsHistoryService } from '../readingsHistoryService.model';

export type RequestStatusShared = 'pending' | 'done' | 'failed' | null;

export function useReadingHistoryValues() {
  const [bufferedValues, setBufferedValues] =
    useState<IndividualDeviceReadingsHistoryResponse | null>(null);

  const { deviceId } = useParams<{ deviceId: string }>();

  const [uploadingReadingsStatuses, setUploadingReadingsStatuses] = useState<{
    [date: string]: RequestStatusShared;
  }>({});

  const initialValues = useStore(
    readingsHistoryService.outputs.$readingHistory,
  );

  useEffect(() => {
    setBufferedValues(initialValues);
  }, [initialValues]);

  const deleteReading = useCallback(
    async (id: number) => {
      try {
        await axios.post(`IndividualDeviceReadings/${id}/remove`);
        readingsHistoryService.inputs.refetchReadingHistory(Number(deviceId));
      } catch (error) {}
    },
    [deviceId],
  );

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
      bufferedValues?.yearReadings,
    );
    const monthIndex = _.findIndex({ month: address.month })(
      bufferedValues?.yearReadings?.[yearIndex].monthReadings,
    );
    const readingIndex = _.findIndex({ id: address.id })(
      bufferedValues?.yearReadings?.[yearIndex].monthReadings?.[monthIndex]
        .readings,
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
      initialValue,
    );

    setBufferedValues((prev) => prev && setInitValue(prev));
  };

  const setFieldValue = useCallback(
    (
      value: string,
      address: {
        year: number;
        month: number;
        id: number | null;
        index: number;
      },
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
                                  ? {
                                      ...elem,
                                      [`value${address.index}`]: value,
                                    }
                                  : elem,
                              ) || [],
                          }
                        : month,
                    ) || [],
                }
              : year,
          ) || [],
      }));
    },
    [],
  );

  const uploadReading = useCallback(
    async (reading: IndividualDeviceReadingsCreateRequest) => {
      const date = moment(reading.readingDate);
      const dateString = `${date.month() + 2}.${date.year()}`;

      setUploadingReadingsStatuses((prev) => ({
        ...prev,
        [dateString]: 'pending',
      }));
      try {
        await createReading(reading);
        readingsHistoryService.inputs.refetchReadingHistory(Number(deviceId));

        setUploadingReadingsStatuses((prev) => ({
          ...prev,
          [dateString]: 'done',
        }));
      } catch (e) {
        message.error(
          (e as unknown as EffectFailDataAxiosError).response.data.error.Text ||
            (e as unknown as EffectFailDataAxiosError).response.data.error
              .Message ||
            'Произошла ошибка',
        );

        setUploadingReadingsStatuses((prev) => ({
          ...prev,
          [dateString]: 'failed',
        }));
      }
    },
    [deviceId],
  );

  const pendingHistory = useStore(
    readingsHistoryService.outputs.fetchReadingHistoryFx.pending,
  );

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
