import { ResourceDisconnectingResponsePagedList } from 'myApi';

export type DisablingListProps = {
  resources: ResourceDisconnectingResponsePagedList | null;
  loading: boolean;
  setPage: (payload: number) => void;
  openModal: () => void;
  handleOpenCompleteDisconnectionModal: (id: string) => void;
  handleOpenDeleteDisconnectionModal: (id: string) => void;
  handleOpenEditDisconnectionModal: (id: string) => void;
};
