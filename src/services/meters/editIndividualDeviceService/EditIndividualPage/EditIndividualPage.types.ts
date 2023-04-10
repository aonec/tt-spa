import { IndividualDeviceResponse } from 'myApi';

export type EditIndividualPageProps = {
  handleChangeTab: (payload: EditIndividualDeviceTabs) => void;
  currentTab: EditIndividualDeviceTabs;
  individualDevice: IndividualDeviceResponse | null;
  isDeviceLoading: boolean;
};

export enum EditIndividualDeviceTabs {
  CommonInfo = 'CommonInfo',
  Documents = 'Documents',
}
