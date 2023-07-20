import { ApartmentActResponse, DocumentResponse } from 'api/myApi';

export type ActCardItemProps = {
  act: ApartmentActResponse;
  handleSaveFile: (document: DocumentResponse) => void;
};
