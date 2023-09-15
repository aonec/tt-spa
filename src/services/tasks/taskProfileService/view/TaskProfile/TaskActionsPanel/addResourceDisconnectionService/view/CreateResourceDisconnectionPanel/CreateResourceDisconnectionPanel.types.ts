import { StagePushRequest } from 'api/types';

export type Props = {
  openCreateDisconnectionModal: () => void;
  handleRemove: () => void;
  pushStageRequest: StagePushRequest | null;
};
