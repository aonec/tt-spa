import {
  EIndividualDeviceReadingsSource,
  GetHousingMeteringDeviceReadingsResponse,
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'api/types';
import { NodeReadingsDataByDevices } from 'services/meters/accountingNodesReadingsInputService/accountingNodesReadingsInputService.types';

export function transformToIndividualDeviceReadingsHistory(
  response: GetHousingMeteringDeviceReadingsResponse,
): IndividualDeviceReadingsHistoryResponse {
  const yearReadings: IndividualDeviceReadingsYearHistoryResponse[] = [];

  // Обработка каждого элемента items из response
  if (response.items) {
    response.items.forEach((item) => {
      const uploadDate = new Date(item.uploadDate);
      const year = uploadDate.getFullYear();
      const month = uploadDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому прибавляем 1

      // Ищем, есть ли уже такой год в массиве
      let yearReading = yearReadings.find((yr) => yr.year === year);
      if (!yearReading) {
        yearReading = { year, monthReadings: [] };
        yearReadings.push(yearReading);
      }

      // Ищем, есть ли уже такой месяц в году
      let monthReading = yearReading.monthReadings?.find(
        (mr) => mr.month === month,
      );
      if (!monthReading) {
        monthReading = { month: month, readings: [] };
        yearReading.monthReadings?.push(monthReading);
      }

      // Создаем запись для месяца
      const reading: IndividualDeviceReadingsItemHistoryResponse = {
        id: item.nodeId, // или другое значение, которое будет уникальным для этой записи
        value1: item.value ? item.value.toString() : null,
        value2: null,
        value3: null,
        value4: null,
        readingDate: null, // Deprecated, оставляем null
        readingDateTime: item.uploadDate,
        actualReadingDate: item.uploadDate,
        uploadTime: item.uploadDate,
        entryDate: item.uploadDate,
        source: {} as EIndividualDeviceReadingsSource, // Заполнить значением, если это необходимо
        user: item.user, // Применяем user, если есть
        isRemoved: item.isRemoved,
        removedTime: item.removedTime,
        removedByUser: item.removedByUser,
        isArchived: item.isArchived,
        consumption1: null,
        consumption2: null,
        consumption3: null,
        consumption4: null,
        averageConsumption1: null,
        averageConsumption2: null,
        averageConsumption3: null,
        averageConsumption4: null,
      };

      // Добавляем запись в месяц
      monthReading.readings?.push(reading);
    });
  }

  return { yearReadings };
}

export function mapToDeviceReadingsHistory(
  nodeReadingsData: NodeReadingsDataByDevices,
): IndividualDeviceReadingsHistoryResponse {
  // Маппинг на итоговый ответ
  const yearReadings: IndividualDeviceReadingsYearHistoryResponse[] = [];

  // Перебираем все устройства (deviceId)
  for (const deviceId in nodeReadingsData) {
    const deviceReadings = nodeReadingsData[deviceId];

    // Группируем по годам и месяцам
    const readingsByYearAndMonth: {
      [year: number]: {
        [month: number]: IndividualDeviceReadingsItemHistoryResponse[];
      };
    } = {};

    for (const reading of deviceReadings) {
      const uploadDate = new Date(reading.uploadDate);
      const year = uploadDate.getFullYear();
      const month = uploadDate.getMonth() + 1; // месяц в JS начинается с 0

      // Инициализируем год и месяц, если еще не существует
      if (!readingsByYearAndMonth[year]) {
        readingsByYearAndMonth[year] = {};
      }
      if (!readingsByYearAndMonth[year][month]) {
        readingsByYearAndMonth[year][month] = [];
      }

      // Формируем объект для истории показаний устройства
      const historyItem: IndividualDeviceReadingsItemHistoryResponse = {
        id: reading.nodeId, // Используем nodeId как id для истории
        value1: String(reading.value),
        value2: null,
        value3: null,
        value4: null,
        readingDate: null, // Поле deprecated, можно оставить null
        readingDateTime: reading.uploadDate, // Используем uploadDate как readingDateTime
        actualReadingDate: reading.uploadDate, // Используем uploadDate как actualReadingDate
        uploadTime: reading.uploadDate, // Используем uploadDate как uploadTime
        entryDate: reading.uploadDate, // Предполагаем, что entryDate - это uploadDate
        source: EIndividualDeviceReadingsSource.Ttm, // Предположим, что источник всегда "manual", можно подкорректировать, если нужно
        user: reading.user, // Используем данные из reading.user
        isRemoved: reading.isRemoved,
        removedTime: reading.removedTime,
        removedByUser: reading.removedByUser,
        isArchived: reading.isArchived,
        consumption1: null, // Предполагаем, что consumption не определен, если его нет
        consumption2: null,
        consumption3: null,
        consumption4: null,
        averageConsumption1: null,
        averageConsumption2: null,
        averageConsumption3: null,
        averageConsumption4: null,
      };

      // Добавляем элемент в нужный месяц и год
      readingsByYearAndMonth[year][month].push(historyItem);
    }

    // Конвертируем данные из годового и месячного формата в IndividualDeviceReadingsYearHistoryResponse
    for (const year in readingsByYearAndMonth) {
      const yearItem: IndividualDeviceReadingsYearHistoryResponse = {
        year: parseInt(year),
        monthReadings: [],
      };

      for (const month in readingsByYearAndMonth[year]) {
        const monthItem: IndividualDeviceReadingsMonthHistoryResponse = {
          month: parseInt(month),
          readings: readingsByYearAndMonth[year][month],
        };
        yearItem.monthReadings!.push(monthItem);
      }

      yearReadings.push(yearItem);
    }
  }

  // Возвращаем итоговый объект
  return { yearReadings };
}


