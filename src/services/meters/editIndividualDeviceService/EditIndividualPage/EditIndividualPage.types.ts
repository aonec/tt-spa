import { IndividualDeviceResponse, UpdateIndividualDeviceRequest } from 'myApi';

export type EditIndividualPageProps = {
  handleChangeTab: (payload: EditIndividualDeviceTabs) => void;
  currentTab: EditIndividualDeviceTabs;
  individualDevice: IndividualDeviceResponse | null;
  isDeviceLoading: boolean;
  handleUpdateDevice: (payload: UpdateIndividualDeviceRequest) => void;
};

export enum EditIndividualDeviceTabs {
  CommonInfo = 'CommonInfo',
  Documents = 'Documents',
}
