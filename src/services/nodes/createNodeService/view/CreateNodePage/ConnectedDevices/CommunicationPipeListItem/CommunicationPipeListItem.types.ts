import { EResourceType } from 'myApi';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CommunicationPipeListItemProps = {
  pipe: CommunicationPipePayload;
  resource: EResourceType;
};
