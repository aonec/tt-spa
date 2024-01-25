import { ReactElement } from 'react';
import { IndividualDeviceReadingsItemHistoryResponse } from 'api/types';

export type ReadingsHistoryContainerProps = {
  readonly?: boolean;
  isModal: boolean;
};

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

export type CorrectReadingValuesValidationResult = {
  validated: boolean;
  valuesValidationResults?: {
    type: 'up' | 'down' | null;
    validated: boolean;
    index: number;
    difference: number;
    currentValue: number | null;
    prevValue: number;
  }[];
  limit?: number;
};

export type RequestStatusShared = 'pending' | 'done' | 'failed' | null;
