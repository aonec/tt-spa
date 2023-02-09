import { ResourceType } from '01/_pages/Graph/components/GraphView/GraphView.types';

export const getResourceColor = (resource: ResourceType): string => {
  switch (resource) {
    case 'HotWaterSupply':
      return '#ff8c68';
    case 'ColdWaterSupply':
      return '#79afff';
    case 'Electricity':
      return '#e2b104';
    case 'Heat':
      return '#9254de';
  }
};
