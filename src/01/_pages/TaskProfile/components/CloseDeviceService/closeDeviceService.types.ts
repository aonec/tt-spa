export type CloseDevicesPayload = {
  deviceCloses: { deviceId: number; closingDate: string }[];
};

export type CloseDevicesContainerProps = {
  setData: (data: CloseDevicesPayload) => void;
};
