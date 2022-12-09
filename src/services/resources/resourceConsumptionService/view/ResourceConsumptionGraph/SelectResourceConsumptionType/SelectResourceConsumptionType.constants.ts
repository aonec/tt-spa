import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';

export const CurrentMonthSelectColors: {
  [key in ResourceConsumptionGraphType]: string;
} = {
  [ResourceConsumptionGraphType.Housing]: '#FF8C68',
  [ResourceConsumptionGraphType.Normative]: '#17B45A',
  [ResourceConsumptionGraphType.Subscriber]: '#272F5A',
};

export const PrevMonthSelectColor: {
  [key in ResourceConsumptionGraphType]: string;
} = {
  [ResourceConsumptionGraphType.Housing]: '#FF8C68',
  [ResourceConsumptionGraphType.Normative]: '#17B45A',
  [ResourceConsumptionGraphType.Subscriber]: '#272F5A',
};
