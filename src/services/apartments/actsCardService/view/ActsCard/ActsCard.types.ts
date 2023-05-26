import { ApartmentActResponse, DocumentResponse } from 'myApi';

export type ActsCardProps = {
  acts: ApartmentActResponse[];
  apartmentid: string;
  handleSaveFile: (document: DocumentResponse) => void;
};
