import { RequestStatusShared } from '../../../readingsHistoryListService.types';

export type ReadingFieldsProps = {
  rateNum: number | null;
  values?: (string | null)[];
  noReading?: boolean;
  suffix?: string | null;
  editable?: boolean;
  onChange?: (value: string, index: number) => void;
  onBlur?(): void;
  onEnter?(values: (number | null)[]): void;
  status?: RequestStatusShared;
  consumption?: boolean;
  style?: React.CSSProperties;
  clearValue?: boolean;
  removed?: boolean;
};
