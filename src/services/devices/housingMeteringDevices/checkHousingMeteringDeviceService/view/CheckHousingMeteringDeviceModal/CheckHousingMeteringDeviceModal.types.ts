import {
  CheckDeviceRequest,
  PipeHousingMeteringDeviceResponse,
} from 'api/myApi';

export type CheckHousingMeteringDeviceModalProps = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  handleOnSubmit: (payload: CheckDeviceRequest) => void;
};
