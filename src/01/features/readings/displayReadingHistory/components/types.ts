import { ReactElement } from 'react';
import { IndividualDeviceReadingsItemHistoryResponse } from 'myApi';

export type ReadingLineProps = {
  reading?: IndividualDeviceReadingsItemHistoryResponse;
  isFirst?: boolean;
  arrowButton?: ReactElement;
  month: number;
  year: number;
  readingsLength: number;
  isHasArchived: boolean;
  prevReading?: IndividualDeviceReadingsItemHistoryResponse;
  isReadonly: boolean;
};

export type ReadingsHistoryListProps = {
  isModal?: boolean;
  readonly?: boolean;
};
