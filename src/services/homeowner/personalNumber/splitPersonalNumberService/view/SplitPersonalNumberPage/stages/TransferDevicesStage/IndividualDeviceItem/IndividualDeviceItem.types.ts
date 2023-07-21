import { IndividualDeviceListItemResponse } from 'api/types';

export type IndividualDeviceItemProps = {
  device: IndividualDeviceListItemResponse;
  isSelected?: boolean;
  chooseDevice?: (id: number) => void;
  isCheckable?: boolean;
};
