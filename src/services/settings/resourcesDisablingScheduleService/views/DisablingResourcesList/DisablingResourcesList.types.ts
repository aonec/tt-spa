import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';

export type DisablingListProps = {
  resources: ResourceDisconnectingResponsePagedList | null;
  loading: boolean;
  setPage: (payload: number) => void;
  openModal: (disconnecion: ResourceDisconnectingResponse) => void;
  handleOpenCompleteDisconnectionModal: (payload: {
    id: string;
    endDate: string;
  }) => void;
  handleOpenDeleteDisconnectionModal: (payload: {
    id: string;
    endDate: string;
  }) => void;
  handleOpenEditDisconnectionModal: (id: string) => void;
  isPermitionToChangeResourceDisabling: boolean;
};
