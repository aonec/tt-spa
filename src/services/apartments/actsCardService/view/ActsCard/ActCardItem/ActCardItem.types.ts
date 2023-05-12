import { ApartmentActResponse, DocumentResponse } from 'myApi';

export type ActCardItemProps = {
  act: ApartmentActResponse;
  handleSaveFile: (document: DocumentResponse) => void;
};
