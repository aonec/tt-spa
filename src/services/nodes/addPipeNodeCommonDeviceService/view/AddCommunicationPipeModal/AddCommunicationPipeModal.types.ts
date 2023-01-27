import { CommunicationPipePayload } from '../../addPipeNodeCommonDeviceService.types';

export type AddCommunicationPipeModalProps = {
  isOpen: boolean;
  closeAddPipeModal: () => void;
  handleAddCommunicationPipe: (
    communicationPipe: CommunicationPipePayload,
  ) => void;
};
