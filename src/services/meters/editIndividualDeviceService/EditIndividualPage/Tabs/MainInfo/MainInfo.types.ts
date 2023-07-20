import {
  IndividualDeviceMountPlaceListResponse,
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from 'api/myApi';

export type MainInfoProps = {
  individualDevice: IndividualDeviceResponse;
  handleUpdateDevice: (payload: {
    deviceId: number;
    payload: UpdateIndividualDeviceRequest;
  }) => void;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  onCancel: () => void;
  isDeviceUpdating: boolean;
};
