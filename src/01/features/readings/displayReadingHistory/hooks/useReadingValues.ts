import { IndividualDeviceReadingsHistoryResponse } from './../../../../../myApi';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $readingHistory } from '../models';

export function useReadingHistoryValues() {
  const [
    bufferedValues,
    setBufferedValues,
  ] = useState<IndividualDeviceReadingsHistoryResponse | null>();

  const initialValues = useStore($readingHistory);

  useEffect(() => {
    setBufferedValues(initialValues);
  }, [initialValues]);

  const setFieldValue = (
    value: string,
    address: { year: number; month: number; date: string }
  ) =>
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
                                ? { ...elem, ...{ value } }
                                : elem
                            ) || [],
                        }
                      : month
                  ) || [],
              }
            : year
        ) || [],
    }));

  return { values: bufferedValues, setFieldValue };
}
