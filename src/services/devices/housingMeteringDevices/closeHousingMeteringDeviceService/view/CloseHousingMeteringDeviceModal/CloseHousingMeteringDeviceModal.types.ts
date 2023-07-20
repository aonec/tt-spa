import {
  CloseDeviceRequest,
  PipeHousingMeteringDeviceResponse,
} from 'api/types';

export type CloseHousingMeteringDeviceModalProps = {
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleOnSubmit: (payload: CloseDeviceRequest) => void;
};
