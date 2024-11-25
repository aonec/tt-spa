import {
  EIndividualDeviceReadingsSource,
  GetHousingMeteringDeviceReadingsResponse,
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'api/types';

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
