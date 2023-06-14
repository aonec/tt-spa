import { EResourceType } from 'myApi';
import { MetersInputBlockStatus } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';

export type AccountingNodeReadingsInputBlockProps = {
  status: MetersInputBlockStatus | null;
  resource?: EResourceType;
  sliderIndex: number;
  inputIndex: number;
  tooltip?: string;
  readingValue: number | null;
  readingDate?: string;
  dataKey: string;
  handleSendReading: (payload: SendReadingPayload) => void;
};

type SendReadingPayload = {
  value: number;
  readingDate: string;
};
