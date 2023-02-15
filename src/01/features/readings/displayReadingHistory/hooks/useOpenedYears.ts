import { useCallback, useEffect, useState } from 'react';
import { IndividualDeviceReadingsYearHistoryResponse } from '../../../../../myApi';
export function useOpenedYears(
  years: IndividualDeviceReadingsYearHistoryResponse[],
) {
  const [openedYears, setOpenedYears] = useState<
    { year: number; openedMonths: number[]; open: boolean }[]
  >([]);

  useEffect(
    () =>
      setOpenedYears(
        years?.map((elem) => ({
          year: elem.year,
          open: true,
          openedMonths: [],
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
