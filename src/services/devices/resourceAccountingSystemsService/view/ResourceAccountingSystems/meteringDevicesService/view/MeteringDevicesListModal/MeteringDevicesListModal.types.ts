import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
  PipeNodeMeteringDeviceResponse,
} from 'myApi';

export type MeteringDevicesListModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  meterindDevicesList: PipeNodeMeteringDeviceResponse[] | null;
  closeDevicesListModal: () => void;
  pipeNode: NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse | null;
};
