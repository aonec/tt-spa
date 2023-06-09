import { CheckDeviceRequest, PipeHousingMeteringDeviceResponse } from 'myApi';

export type CheckHousingMeteringDeviceModalProps = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  handleOnSubmit: (payload: CheckDeviceRequest) => void;
};
