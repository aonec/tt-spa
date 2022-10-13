import { EResourceType } from '../../myApi';

export interface CorrectReadingValuesValidationResult {
  validated: boolean;
  valuesValidationResults?: {
    type: 'up' | 'down' | null;
    validated: boolean;
    index: number;
    difference: number;
    currentValue: number;
    prevValue: number;
  }[];
  limit?: number;
}

export function round(x: number, n: number) {
  if (!x) return x;

  const m = Math.pow(10, n);
  return Math.round(x * m) / m;
}

export const getInputColor = (resource: EResourceType) => {
  switch (resource) {
    case 'HotWaterSupply':
      return '#FF8C68';
    case 'ColdWaterSupply':
      return '#79AFFF';
    case 'Heat':
      return 'Отопление';
    case 'Electricity':
      return '#E2B104';
  }
};
