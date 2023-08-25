import {
  CheckDeviceRequest,
  PipeHousingMeteringDeviceResponse,
} from 'api/types';

export type CheckHousingMeteringDeviceModalProps = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  handleOnSubmit: (payload: CheckDeviceRequest) => void;
};
