import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type ConfiguratePipeProps = {
  handleChangeNumber: (number: number) => void;
  handleChangeDiameter: (diameter: number) => void;
  pipe: CommunicationPipePayload;
  index: number;
};
