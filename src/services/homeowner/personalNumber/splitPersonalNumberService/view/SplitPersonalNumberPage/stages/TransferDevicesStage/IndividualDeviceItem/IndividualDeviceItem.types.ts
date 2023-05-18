import { IndividualDeviceListItemResponse } from 'myApi';

export type IndividualDeviceItemProps = {
  device: IndividualDeviceListItemResponse;
  isSelected: boolean;
  chooseDevice: (id: number) => void;
};
