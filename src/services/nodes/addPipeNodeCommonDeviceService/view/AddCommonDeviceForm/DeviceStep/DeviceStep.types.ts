import { CommunicationPipePayload } from "services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types";

export type DeviceStepProps = {
  openAddPipeModal: () => void;
  communicationPipes: CommunicationPipePayload[];
};
