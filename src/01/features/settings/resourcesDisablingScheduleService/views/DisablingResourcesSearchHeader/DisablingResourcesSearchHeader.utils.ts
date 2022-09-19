import { EResourceDisconnectingType } from "myApi";

export const ClassLookUp: { [key in EResourceDisconnectingType]: string } = {
    [EResourceDisconnectingType.Emergency]: 'Аварийное',
    [EResourceDisconnectingType.Other]: 'Прочее',
    [EResourceDisconnectingType.Planned]: 'Плановое',
    [EResourceDisconnectingType.Preventive]: 'Профилактическое',
    [EResourceDisconnectingType.Repair]: 'КАП Ремонт',
  };