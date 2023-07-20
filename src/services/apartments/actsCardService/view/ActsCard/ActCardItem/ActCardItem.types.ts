import { ApartmentActResponse, DocumentResponse } from 'api/types';

export type ActCardItemProps = {
  act: ApartmentActResponse;
  handleSaveFile: (document: DocumentResponse) => void;
};
