import { EResourceType } from 'api/myApi';

export const resourceSummaryUnits: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: 'м³',
  [EResourceType.HotWaterSupply]: 'м³',
  [EResourceType.Electricity]: 'кВт/ч',
  [EResourceType.Heat]: 'Гкал',
};
