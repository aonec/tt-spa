import { NodeOnHousingStockResponse, PipeNodeMeteringDeviceResponse } from 'myApi';

export type MeteringDevicesListModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  meterindDevicesList: PipeNodeMeteringDeviceResponse[] | null;
  closeDevicesListModel: () => void;
  pipeNode: NodeOnHousingStockResponse | null;
};
