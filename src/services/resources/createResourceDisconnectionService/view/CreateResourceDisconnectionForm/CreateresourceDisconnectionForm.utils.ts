import { EResourceDisconnectingType } from 'myApi';

export const resourceDisconnectingNamesLookup: { [key: string]: string } = {
  [EResourceDisconnectingType.Planned]: 'Плановое',
  [EResourceDisconnectingType.Preventive]: 'Preventive',
  [EResourceDisconnectingType.Repair]: 'Ремонт',
  [EResourceDisconnectingType.Other]: 'Другое',
  [EResourceDisconnectingType.Emergency]: 'Чрезвычайная ситуация',
};
