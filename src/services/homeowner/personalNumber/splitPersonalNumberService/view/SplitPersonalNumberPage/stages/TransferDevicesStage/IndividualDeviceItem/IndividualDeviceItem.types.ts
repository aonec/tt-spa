import { IndividualDeviceListItemResponse } from 'api/myApi';

export type IndividualDeviceItemProps = {
  device: IndividualDeviceListItemResponse;
  isSelected?: boolean;
  chooseDevice?: (id: number) => void;
  isCheckable?: boolean;
};
