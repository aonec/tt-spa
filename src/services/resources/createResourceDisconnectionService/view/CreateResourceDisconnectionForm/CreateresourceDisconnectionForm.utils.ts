import dayjs from 'api/dayjs';
import { BuildingListResponse, ResourceDisconnectingResponse } from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
import { hours } from './CreateResourceDisconnectionForm.constants';

export const getDate = (date: string, hour: string) =>
  dayjs(`${date} ${hour}`, 'DD.MM.YYYY HH:00').toISOString();

export const getAllHousingStocks = (items: TreeSelectElement[]): number[] =>
  items.reduce((acc, item) => {
    const children = item?.children;
    if (!children) {
      return [...acc, Number(item.value)];
    }
    const allHousingStocks = getAllHousingStocks(children);
    return [...acc, ...allHousingStocks];
  }, [] as number[]);

export const getFormValues = (
  resourceDisconnection: ResourceDisconnectingResponse,
  selectedBuilding: BuildingListResponse | null,
) => {
  const { heatingStation, disconnectingType, buildings, startDate, endDate } =
    resourceDisconnection;

  const heatingStationId = heatingStation?.id;
  const housingStockIds = (buildings || []).map(
    (housingStock) => housingStock.id,
  );

  return {
    ...resourceDisconnection,
    documentId: resourceDisconnection.document?.id || null,
    housingStockIds: selectedBuilding
      ? [...housingStockIds, selectedBuilding.id]
      : housingStockIds,
    startDate: dayjs(startDate).format('DD.MM.YYYY'),
    startHour: dayjs(startDate).format('HH:mm'),
    endDate: endDate ? dayjs(endDate).format('DD.MM.YYYY') : '',
    endHour: endDate ? dayjs(endDate).format('HH:mm') : '0:00',
    disconnectingType: disconnectingType?.value || null,
    sender: resourceDisconnection?.sender || '',
    heatingStationId,
  };
};

export const prepareEndHours = (startHour: string) =>
  hours.filter((hour) => {
    const startHourNumber = Number(startHour.split(':')[0]);
    const endHourNumber = Number(hour.split(':')[0]);

    return endHourNumber >= startHourNumber;
  });
