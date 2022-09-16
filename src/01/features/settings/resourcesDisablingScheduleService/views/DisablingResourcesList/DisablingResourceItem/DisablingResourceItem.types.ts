import { ResourceDisconnectingResponse } from 'myApi';

export type RenderApartmentProps = {
  openModal: () => void;
  disconnection: ResourceDisconnectingResponse;
};
