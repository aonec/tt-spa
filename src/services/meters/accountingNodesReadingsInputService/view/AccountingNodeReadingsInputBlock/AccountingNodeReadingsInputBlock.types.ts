import { EResourceType } from 'api/types';
import { MetersInputBlockStatus } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';

export type AccountingNodeReadingsInputBlockProps = {
  readingValue: number | null;
  status: MetersInputBlockStatus | null;
  sliderIndex: number;
  handleSendReading: (payload: SendReadingPayload) => void;
  dataKey: string;
  resource?: EResourceType;
  inputIndex?: number;
  tooltip?: string;
  readingDate?: string;
  withoutDate?: boolean;
};

type SendReadingPayload = {
  value: number | null;
  readingDate: string;
};
