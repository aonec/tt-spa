import {
  AccountingNodesReadingsMonthHistoryResponse,
  AccountingNodesReadingsYearHistoryResponse,
  HistoryMonthReadingType,
} from './AccountingNodesReadingsService.types';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';
import dayjs from 'dayjs';

export function mapToDeviceReadingsHistory(
  nodeReadingsData:
    | HousingMeteringDeviceReadingsIncludingPlacementResponse[]
    | null,
) {
  if (!nodeReadingsData) {
    return [];
  }

  const yearReadings: AccountingNodesReadingsYearHistoryResponse[] = [];

  // Группируем по годам и месяцам
  const readingsByYearAndMonth: {
    [year: number]: {
      [month: number]: HistoryMonthReadingType[];
    };
  } = {};

  nodeReadingsData.forEach((reading) => {
    if (!reading.uploadDate || !reading.nodeId || reading.value === undefined) {
      return;
    }

    const uploadDate = dayjs(reading.uploadDate);
    const year = uploadDate.year();
    const month = uploadDate.month() + 1;

    // Инициализируем год и месяц, если еще не существует
    if (!readingsByYearAndMonth[year]) {
      readingsByYearAndMonth[year] = {};
    }
    if (!readingsByYearAndMonth[year][month]) {
      readingsByYearAndMonth[year][month] = [];
    }

    const historyItem: HistoryMonthReadingType = {
      id: reading.nodeId,
      value: reading.value,
      uploadTime: reading.uploadDate,
      user: reading.user,
      isRemoved: reading.isRemoved,
      removedTime: reading.removedTime
        ? dayjs(reading.removedTime).toISOString()
        : null,
      removedByUser: reading.removedByUser,
      isArchived: reading.isArchived,
    };

    // Добавляем элемент в нужный месяц и год
    readingsByYearAndMonth[year][month].push(historyItem);
  });

  // Сортировка по годам (по убыванию)
  const sortedYears = Object.keys(readingsByYearAndMonth)
    .map((year) => parseInt(year))
    .sort((a, b) => b - a); // Сортировка по убыванию года

  // Сортировка месяцев от 1 до 12 для каждого года и сортировка по uploadTime внутри каждого месяца
  sortedYears.forEach((year) => {
    const sortedMonths = Object.keys(readingsByYearAndMonth[year])
      .map((month) => parseInt(month))
      .sort((a, b) => a - b); // Сортировка месяцев от 1 до 12

    sortedMonths.forEach((month) => {
      // Сортировка внутри месяца по uploadTime (по убыванию)
      readingsByYearAndMonth[year][month].sort((a, b) => {
        return dayjs(b.uploadTime).isBefore(dayjs(a.uploadTime)) ? 1 : -1;
      });
    });
  });

  // Конвертируем данные из годового и месячного формата в AccountingNodesReadingsYearHistoryResponse
  sortedYears.forEach((year) => {
    const yearItem: AccountingNodesReadingsYearHistoryResponse = {
      year: year,
      monthReadings: [],
    };

    const sortedMonths = Object.keys(readingsByYearAndMonth[year])
      .map((month) => parseInt(month))
      .sort((a, b) => a - b);

    sortedMonths.forEach((month) => {
      const monthItem: AccountingNodesReadingsMonthHistoryResponse = {
        month: month,
        readings: readingsByYearAndMonth[year][month],
      };

      yearItem.monthReadings!.push(monthItem);
    });

    yearReadings.push(yearItem);
  });

  return yearReadings;
}
