import { ResourceType } from '../_pages/Graph/components/GraphView';

export const getResourceColor = (resource: ResourceType): string => {
  switch (resource) {
    case 'HotWaterSupply':
      return 'var(--hot-water)';
    case 'ColdWaterSupply':
      return 'var(--cold-water)';
    case 'Electricity':
      return 'var(--electro)';
    case 'Heat':
      return 'var(--heat)';
  }
};
