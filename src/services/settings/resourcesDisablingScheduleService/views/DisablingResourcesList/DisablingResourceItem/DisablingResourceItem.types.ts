import { ResourceDisconnectingResponse } from 'api/types';

export type RenderApartmentProps = {
  openModal: (disconnecion: ResourceDisconnectingResponse) => void;
  disconnection: ResourceDisconnectingResponse;
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
