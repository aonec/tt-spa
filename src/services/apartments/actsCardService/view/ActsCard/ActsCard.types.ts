import { ApartmentActResponse, DocumentResponse } from 'api/types';

export type ActsCardProps = {
  acts: ApartmentActResponse[];
  apartmentid: string;
  handleSaveFile: (document: DocumentResponse) => void;
};
