import { CloseDeviceRequest, PipeHousingMeteringDeviceResponse } from 'myApi';

export type CloseHousingMeteringDeviceModalProps = {
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleOnSubmit: (payload: CloseDeviceRequest) => void;
};
