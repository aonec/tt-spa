import { IndividualDeviceListItemResponse } from 'myApi';

export type ApartmentIndividualDevicesMetersProps = {
  individualDevicesList: IndividualDeviceListItemResponse[];
  isLoading: boolean;
  isShowClosedDevices: boolean;
  setIsShowClosedDevices: (value: boolean) => void;
  closedDevicesCount: number | null;
  sliderIndex: number;
  upSliderIndex: () => void;
  downSliderIndex: () => void;
};
