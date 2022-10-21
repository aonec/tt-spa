import { ResourceType } from "01/_pages/Graph/components/GraphView/GraphView.types";

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
