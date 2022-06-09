import { IndividualDeviceOnTaskResponse } from 'myApi';

export type CloseDevicesProps = {
  handleDeviceCheboxClicked: (id: number) => void;
  onChangeClosingDate: (id: number, closingData: string) => void;
  devices?: IndividualDeviceOnTaskResponse[] | null;
  selectedDevices: { id: number; closingDate: string | null }[];
};
