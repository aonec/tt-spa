import {
  AccountingNodesReadingsYearHistoryResponse,
  HistoryMonthReadingType,
} from './AccountingNodesReadingsService.types';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';
import dayjs from 'dayjs';

export function mapToDeviceReadingsHistory(
  nodeReadingsData:
    | HousingMeteringDeviceReadingsIncludingPlacementResponse[]
    | null,
): AccountingNodesReadingsYearHistoryResponse[] {
  if (!nodeReadingsData) return [];

  const readingsByYearAndMonth: Record<
    number,
    Record<number, HistoryMonthReadingType[]>
  > = {};

  // Группируем данные по годам и месяцам
  nodeReadingsData.forEach((reading) => {
    const {
      uploadDate,
      nodeId,
      value,
      user,
      isRemoved,
      removedTime,
      removedByUser,
      isArchived,
    } = reading;

    if (isArchived || isRemoved) return;
    if (!uploadDate || nodeId === undefined || value === undefined) return;

    const date = dayjs(uploadDate);
    const year = date.year();
    const month = date.month() + 1;

    readingsByYearAndMonth[year] ??= {};
    readingsByYearAndMonth[year][month] ??= [];

    readingsByYearAndMonth[year][month].push({
      id: nodeId,
      value,
      uploadTime: uploadDate,
      user,
      isRemoved,
      removedTime: removedTime ? dayjs(removedTime).toISOString() : null,
      removedByUser,
      isArchived,
    });
  });

  // Формируем итоговую структуру
  return Object.entries(readingsByYearAndMonth)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Сортировка годов по убыванию
    .map(([year, months]) => ({
      year: Number(year),
      monthReadings: Object.entries(months)
        .sort(([monthA], [monthB]) => Number(monthA) - Number(monthB)) // Сортировка месяцев по возрастанию
        .map(([month, readings]) => ({
          month: Number(month),
          readings: readings.sort((a, b) =>
            dayjs(b.uploadTime).diff(dayjs(a.uploadTime)),
          ), // Сортировка по времени
        })),
    }));
}
