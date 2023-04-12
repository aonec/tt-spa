import {
  IndividualDeviceMountPlaceListResponse,
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from 'myApi';

export type EditIndividualPageProps = {
  handleChangeTab: (payload: EditIndividualDeviceTabs) => void;
  currentTab: EditIndividualDeviceTabs;
  individualDevice: IndividualDeviceResponse | null;
  isDeviceLoading: boolean;
  handleUpdateDevice: (payload: {
    deviceId: number;
    payload: UpdateIndividualDeviceRequest;
  }) => void;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  onCancel: () => void;
};

export enum EditIndividualDeviceTabs {
  CommonInfo = 'CommonInfo',
  Documents = 'Documents',
}
