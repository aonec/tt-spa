import { ReactElement } from 'react';
import { IndividualDeviceReadingsItemHistoryResponse } from 'api/myApi';

export type RenderReading = {
  reading?: IndividualDeviceReadingsItemHistoryResponse;
  isFirst?: boolean;
  arrowButton?: ReactElement;
  month: number;
  year: number;
  readingsLength: number;
  isHasArchived: boolean;
  prevReading?: IndividualDeviceReadingsItemHistoryResponse | null;
};
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
