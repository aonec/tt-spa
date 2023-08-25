import { EResourceType } from 'api/types';
import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';

export const ResourceConsumptionGraphColors: {
  [key in ResourceConsumptionGraphType]: string;
} = {
  [ResourceConsumptionGraphType.Housing]: '',
  [ResourceConsumptionGraphType.Normative]: '#17B45A',
  [ResourceConsumptionGraphType.Subscriber]: '#272F5A',
};

export const ResourceConsumptionGraphColorsMeasure: {
  [key in EResourceType]: string;
} = {
  [EResourceType.ColdWaterSupply]: 'м³',
  [EResourceType.HotWaterSupply]: 'м³',
  [EResourceType.Electricity]: 'кВт/ч',
  [EResourceType.Heat]: 'Гкал',
};
