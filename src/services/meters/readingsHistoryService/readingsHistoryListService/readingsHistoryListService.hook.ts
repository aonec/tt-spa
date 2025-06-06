import { useCallback, useEffect, useState } from 'react';
import { IndividualDeviceReadingsYearHistoryResponse } from 'api/types';
import { useParams } from 'react-router-dom';
import {
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'api/types';
import { useUnit } from 'effector-react';
import axios from 'api/axios';
import dayjs from 'api/dayjs';
import _ from 'lodash/fp';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { readingsHistoryService } from '../readingsHistoryService.model';
import { createReading } from './readingsHistoryListService.api';
import { RequestStatusShared } from './readingsHistoryListService.types';

export function useReadingHistoryValues() {
  const [bufferedValues, setBufferedValues] =
    useState<IndividualDeviceReadingsHistoryResponse | null>(null);

  const { deviceId } = useParams<{ deviceId: string }>();

  const [uploadingReadingsStatuses, setUploadingReadingsStatuses] = useState<{
    [date: string]: RequestStatusShared;
  }>({});

  const { initialValues, pendingHistory } = useUnit({
    initialValues: readingsHistoryService.outputs.$readingHistory,
    pendingHistory: readingsHistoryService.outputs.$isReadingsHistoryLoading,
  });

  useEffect(() => {
    setBufferedValues(initialValues);
  }, [initialValues]);

  const deleteReading = useCallback(
    async (id: number) => {
      try {
        await axios.post(`IndividualDeviceReadings/${id}/remove`);
        readingsHistoryService.inputs.refetchReadingHistory(Number(deviceId));
      } catch (error) {
        console.error(error);
      }
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
      const date = dayjs(reading.readingDate);
      const dateString = date.add(1, 'month').format('M.YYYY');

      setUploadingReadingsStatuses((prev) => ({
        ...prev,
        [dateString]: 'pending',
      }));
      try {
        if (reading.value1 !== null) await createReading(reading);
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

export function useOpenedYears(
  years: IndividualDeviceReadingsYearHistoryResponse[],
) {
  const [openedYears, setOpenedYears] = useState<
    { year: number; openedMonths: number[]; open: boolean }[]
  >([]);

  useEffect(
    () =>
      setOpenedYears(
        (prev) =>
          years?.map((elem) => ({
            year: elem.year,
            open: true,
            openedMonths:
              prev.find((openedYear) => openedYear.year === elem.year)
                ?.openedMonths || [],
          })) || [],
      ),
    [years],
  );

  const openYear = useCallback(
    (year: number) =>
      setOpenedYears((prev) =>
        prev.map((elem) =>
          elem.year === year ? { ...elem, open: true } : elem,
        ),
      ),
    [],
  );

  const closeYear = useCallback(
    (year: number) =>
      setOpenedYears((prev) =>
        prev.map((elem) =>
          elem.year === year ? { ...elem, open: false } : elem,
        ),
      ),
    [],
  );

  const isYearOpen = useCallback(
    (year: number) => openedYears.find((elem) => elem.year === year)?.open,
    [openedYears],
  );

  const openMonth = useCallback(
    (year: number, month: number) =>
      setOpenedYears((prev) =>
        prev.map((elem) =>
          elem.year === year
            ? { ...elem, openedMonths: [...elem.openedMonths, month] }
            : elem,
        ),
      ),
    [],
  );

  const closeMonth = useCallback(
    (year: number, month: number) =>
      setOpenedYears((prev) =>
        prev.map((elem) =>
          elem.year === year
            ? {
                ...elem,
                openedMonths: elem.openedMonths.filter(
                  (elem) => elem !== month,
                ),
              }
            : elem,
        ),
      ),
    [],
  );

  const isMonthOpen = useCallback(
    (year: number, month: number) =>
      Boolean(
        openedYears
          .find((elem) => elem.year === year)
          ?.openedMonths.find((elem) => elem === month),
      ),
    [openedYears],
  );

  return {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  };
}
