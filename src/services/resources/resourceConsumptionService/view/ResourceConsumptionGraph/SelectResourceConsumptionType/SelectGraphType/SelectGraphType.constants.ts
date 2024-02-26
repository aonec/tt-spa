import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';

export const TypeNameLookup: {
  [key in ResourceConsumptionGraphType]: string;
} = {
  [ResourceConsumptionGraphType.Housing]: 'Общедомовое потребление',
  [ResourceConsumptionGraphType.Normative]: 'Нормативное потребление',
  [ResourceConsumptionGraphType.Subscriber]: 'Абонентское потребление',
};
