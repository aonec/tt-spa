import { IndividualDeviceResponse, UpdateIndividualDeviceRequest } from 'myApi';

export type MainInfoProps = {
  individualDevice: IndividualDeviceResponse;
  handleUpdateDevice: (payload: UpdateIndividualDeviceRequest) => void;
};
