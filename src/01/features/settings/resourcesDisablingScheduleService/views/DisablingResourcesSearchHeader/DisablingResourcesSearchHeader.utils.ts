import { EResourceDisconnectingType } from 'myApi';

export const ResourceDisconnectingClassLookUp: {
  [key in EResourceDisconnectingType]: string;
} = {
  [EResourceDisconnectingType.Emergency]: 'Аварийное',
  [EResourceDisconnectingType.Other]: 'Прочее',
  [EResourceDisconnectingType.Planned]: 'Плановое',
  [EResourceDisconnectingType.Preventive]: 'Профилактическое',
  [EResourceDisconnectingType.Repair]: 'КАП Ремонт',
  [EResourceDisconnectingType.InterHeatingSeason]: 'Межотопительный',
};
