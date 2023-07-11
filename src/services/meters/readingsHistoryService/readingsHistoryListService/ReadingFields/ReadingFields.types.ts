import { RequestStatusShared } from '../hooks/useReadingValues';

export type ReadingFieldsProps = {
  values?: (string | null)[];
  noReading?: boolean;
  rateNum: number | null;
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
