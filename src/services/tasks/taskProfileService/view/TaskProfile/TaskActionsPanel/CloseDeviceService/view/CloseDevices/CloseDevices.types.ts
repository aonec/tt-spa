import { IndividualDeviceOnTaskResponse } from 'api/types';

export type CloseDevicesProps = {
  handleDeviceCheckboxClicked: (id: number) => void;
  onChangeClosingDate: (id: number, closingData: string) => void;
  devices?: IndividualDeviceOnTaskResponse[] | null;
  selectedDevices: { id: number; closingDate: string | null }[];
};
