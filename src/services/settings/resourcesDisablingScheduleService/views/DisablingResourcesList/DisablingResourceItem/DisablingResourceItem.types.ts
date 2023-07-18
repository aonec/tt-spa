import { ResourceDisconnectingResponse } from 'myApi';

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
