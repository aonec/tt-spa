import styled from 'styled-components';
import { TrashIcon } from 'ui-kit/icons';
import { EPipeNodeConfig, EResourceType } from 'myApi';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CommunicationPipeListItemProps = {
  pipe: CommunicationPipePayload;
  configuration: EPipeNodeConfig;
  handleDeletePipe?: (pipeId: number) => void;
  handleDeleteDevice?: (pipeId: number, deviceIndex: number) => void;
};

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
`;
