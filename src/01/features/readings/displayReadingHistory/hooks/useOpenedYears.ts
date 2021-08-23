import { useEffect, useState } from 'react';
import { IndividualDeviceReadingsYearHistoryResponse } from '../../../../../myApi';
export function useOpenedYears(
  years: IndividualDeviceReadingsYearHistoryResponse[]
) {
  const [openedYears, setOpenedYears] = useState<
    { year: number; openedMonths: number[]; open: boolean }[]
  >([]);

  useEffect(
    () =>
      setOpenedYears(
        years?.map((elem, index) => ({
          year: elem.year,
          open: index === 0,
          openedMonths: [],
        })) || []
      ),
    [years]
  );

  const openYear = (year: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) => (elem.year === year ? { ...elem, open: true } : elem))
    );

  const closeYear = (year: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) => (elem.year === year ? { ...elem, open: false } : elem))
    );

  const isYearOpen = (year: number) =>
    openedYears.find((elem) => elem.year === year)?.open;

  const openMonth = (year: number, month: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) =>
        elem.year === year
          ? { ...elem, openedMonths: [...elem.openedMonths, month] }
          : elem
      )
    );

  const closeMonth = (year: number, month: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) =>
        elem.year === year
          ? {
              ...elem,
              openedMonths: elem.openedMonths.filter((elem) => elem !== month),
            }
          : elem
      )
    );

  const isMonthOpen = (year: number, month: number) =>
    Boolean(
      openedYears
        .find((elem) => elem.year === year)
        ?.openedMonths.find((elem) => elem === month)
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
