import { ResourceDisconnectingResponse } from 'myApi';

export type RenderApartmentProps = {
  openModal: () => void;
  disconnection: ResourceDisconnectingResponse;
  handleOpenCompleteDisconnectionModal: (id: string) => void;
  handleOpenDeleteDisconnectionModal: (id: string) => void;
};
