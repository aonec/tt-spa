import moment from 'moment';
import { ResourceDisconnectingResponse } from 'myApi';
import { TreeSelectElement } from '../CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';
import { hours } from './CreateResourceDisconnectionForm.constants';

export const getDate = (date: string, hour: string) =>
  moment(`${date} ${hour}`, 'DD.MM.YYYY HH:00').toISOString();

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
  resourceDisconnection: ResourceDisconnectingResponse
) => {
  const {
    heatingStation,
    disconnectingType,
    housingStocks,
    startDate,
    endDate,
  } = resourceDisconnection;

  const heatingStationId = heatingStation?.id;
  const housingStockIds = (housingStocks || []).map(
    (housingStock) => housingStock.id
  );

  return {
    ...resourceDisconnection,
    documentId: resourceDisconnection.document?.id || null,
    housingStockIds,
    startDate: moment(startDate).format('DD.MM.YYYY'),
    startHour: moment(startDate).format('HH:mm'),
    endDate: endDate ? moment(endDate).format('DD.MM.YYYY') : '',
    endHour: endDate ? moment(endDate).format('HH:mm') : '0:00',
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
