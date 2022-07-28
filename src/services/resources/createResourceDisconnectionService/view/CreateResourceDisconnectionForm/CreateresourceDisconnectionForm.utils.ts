import moment from 'moment';
import { EResourceDisconnectingType } from 'myApi';

export const resourceDisconnectingNamesLookup: { [key: string]: string } = {
  [EResourceDisconnectingType.Planned]: 'Плановое',
  [EResourceDisconnectingType.Preventive]: 'Preventive',
  [EResourceDisconnectingType.Repair]: 'Ремонт',
  [EResourceDisconnectingType.Other]: 'Другое',
  [EResourceDisconnectingType.Emergency]: 'Чрезвычайная ситуация',
};

export const getDate = (date: string, hour: string) =>
  moment(`${date} ${hour}`, 'DD.MM.YYYY HH:00').toISOString();
