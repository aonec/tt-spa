import { NodeReadingsDataByDevices } from 'services/meters/accountingNodesReadingsInputService/accountingNodesReadingsInputService.types';
import {
  AccountingNodesReadingsMonthHistoryResponse,
  AccountingNodesReadingsYearHistoryResponse,
  HistoryMonthReadingType,
} from './AccountingNodesReadingsService.types';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';

import dayjs from 'dayjs';

export function mapToDeviceReadingsHistory(
  nodeReadingsData: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
) {
  // Проверяем, что nodeReadingsData является массивом
  if (!Array.isArray(nodeReadingsData)) {
    throw new Error('Expected nodeReadingsData to be an array');
  }

  const yearReadings: AccountingNodesReadingsYearHistoryResponse[] = [];

  // Группируем по годам и месяцам
  const readingsByYearAndMonth: {
    [year: number]: {
      [month: number]: HistoryMonthReadingType[];
    };
  } = {};

  for (const reading of nodeReadingsData) {
    // Проверяем, что в reading есть нужные данные
    if (!reading.uploadDate || !reading.nodeId || reading.value === undefined) {
      continue; // Пропускаем некорректные данные
    }

    // Используем dayjs для работы с датой
    const uploadDate = dayjs(reading.uploadDate);
    const year = uploadDate.year();
    const month = uploadDate.month() + 1; // месяц в dayjs начинается с 0

    // Инициализируем год и месяц, если еще не существует
    if (!readingsByYearAndMonth[year]) {
      readingsByYearAndMonth[year] = {};
    }
    if (!readingsByYearAndMonth[year][month]) {
      readingsByYearAndMonth[year][month] = [];
    }

    // Формируем объект для истории показаний устройства
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
  }

  // Конвертируем данные из годового и месячного формата в AccountingNodesReadingsYearHistoryResponse
  for (const year in readingsByYearAndMonth) {
    const yearItem: AccountingNodesReadingsYearHistoryResponse = {
      year: parseInt(year),
      monthReadings: [],
    };

    for (const month in readingsByYearAndMonth[year]) {
      const monthItem: AccountingNodesReadingsMonthHistoryResponse = {
        month: parseInt(month),
        readings: readingsByYearAndMonth[year][month],
      };

      yearItem.monthReadings!.push(monthItem);
    }

    yearReadings.push(yearItem);
  }

  return yearReadings;
}
