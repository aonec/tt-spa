import {
  IndividualDeviceMountPlaceListResponse,
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from 'myApi';

export type MainInfoProps = {
  individualDevice: IndividualDeviceResponse;
  handleUpdateDevice: (payload: {
    deviceId: number;
    payload: UpdateIndividualDeviceRequest;
  }) => void;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  onCancel: () => void;
};