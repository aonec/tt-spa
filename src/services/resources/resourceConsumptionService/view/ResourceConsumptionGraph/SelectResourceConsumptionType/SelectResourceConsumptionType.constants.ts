import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';

export const ResourceConsumptionGraphColors: {
  [key in ResourceConsumptionGraphType]: string;
} = {
  [ResourceConsumptionGraphType.Housing]: '',
  [ResourceConsumptionGraphType.Normative]: '#17B45A',
  [ResourceConsumptionGraphType.Subscriber]: '#272F5A',
};
