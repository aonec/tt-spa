import { ApartmentActResponse, DocumentResponse } from 'api/myApi';

export type ActsCardProps = {
  acts: ApartmentActResponse[];
  apartmentid: string;
  handleSaveFile: (document: DocumentResponse) => void;
};
