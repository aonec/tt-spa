import {
  IndividualDeviceMountPlaceListResponse,
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from 'api/myApi';

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
  isDeviceUpdating: boolean;
};

export enum EditIndividualDeviceTabs {
  CommonInfo = 'CommonInfo',
  Documents = 'Documents',
}
