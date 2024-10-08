import {
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
  PipeNodeMeteringDeviceResponse,
} from 'api/types';

export type MeteringDevicesListModalProps = {
  isModalOpen: boolean;
  isLoading: boolean;
  meterindDevicesList: PipeNodeMeteringDeviceResponse[] | null;
  closeDevicesListModal: () => void;
  pipeNode: NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse | null;
};
