import { IndividualDeviceListItemResponse } from 'api/myApi';
import { BufferedReadingValues } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';

export type EditReadingsHistoryModalProps = {
  handleCloseModal: () => void;
  isOpen: boolean;
  device: IndividualDeviceListItemResponse;
  readingDate: string;
  setReadingDate: (date: string) => void;
  readings: BufferedReadingValues;
  setReadings: (readings: BufferedReadingValues) => void;
  editReadings: () => void;
};
