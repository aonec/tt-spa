import styled from 'styled-components';
import { TrashIcon } from 'ui-kit/icons';
import { EPipeNodeConfig } from 'myApi';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CommunicationPipeListItemProps = {
  pipe: CommunicationPipePayload;
  configuration: EPipeNodeConfig;
  handleDeletePipe?: (pipeId: string) => void;
  handleDeleteDevice?: (pipeId: string, deviceIndex: number) => void;
  handleEditDevice?: (deviceId: number) => void;
};

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
`;
