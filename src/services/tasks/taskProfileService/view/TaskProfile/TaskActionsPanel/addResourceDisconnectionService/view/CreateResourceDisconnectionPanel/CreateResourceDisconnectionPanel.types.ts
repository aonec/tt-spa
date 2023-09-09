import { ResourceDisconnectingCreateRequest } from 'api/types';

export type Props = {
  openCreateDisconnectionModal: () => void;
  createDisconnectionRequestPayload: ResourceDisconnectingCreateRequest | null;
};
