import { ReactElement } from 'react';
import { IndividualDeviceReadingsItemHistoryResponse } from "myApi";

export type RenderReading = {
  reading?: IndividualDeviceReadingsItemHistoryResponse;
  isFirst?: boolean;
  arrowButton?: ReactElement;
  month: number;
  year: number;
  readingsLength: number;
  isHasArchived: boolean;
  prevReading?: IndividualDeviceReadingsItemHistoryResponse;
}
