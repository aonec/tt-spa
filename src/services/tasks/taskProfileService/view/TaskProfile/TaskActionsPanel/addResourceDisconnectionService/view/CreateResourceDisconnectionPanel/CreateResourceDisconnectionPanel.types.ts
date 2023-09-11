import {
  ResourceDisconnectingCreateRequest,
  StagePushRequest,
} from 'api/types';

export type Props = {
  openCreateDisconnectionModal: () => void;
  createDisconnectionRequestPayload: ResourceDisconnectingCreateRequest | null;
  pushStageRequest: StagePushRequest | null;
};
