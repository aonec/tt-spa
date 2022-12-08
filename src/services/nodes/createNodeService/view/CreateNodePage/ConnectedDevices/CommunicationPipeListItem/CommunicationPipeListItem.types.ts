import styled from 'styled-components';
import { TrashIcon } from 'ui-kit/icons';
import { EResourceType } from 'myApi';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export type CommunicationPipeListItemProps = {
  pipe: CommunicationPipePayload;
  resource: EResourceType;
  handleDeletePipe?: (pipeId: number) => void;
  handleDeleteDevice?: (pipeId: number, deviceIndex: number) => void;
};

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
`;
