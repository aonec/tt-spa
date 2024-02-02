import { ApartmentActResponse, DocumentResponse } from 'api/types';

export type Props = {
  act: ApartmentActResponse;
  handleSaveFile: (payload: DocumentResponse) => void;
};
