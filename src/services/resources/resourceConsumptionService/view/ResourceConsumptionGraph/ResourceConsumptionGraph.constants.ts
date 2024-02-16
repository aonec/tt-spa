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

export const tickValues = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];
