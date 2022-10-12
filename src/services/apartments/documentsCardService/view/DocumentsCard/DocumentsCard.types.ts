import { DocumentResponse } from 'myApi';

export type DocumentsCardProps = {
  apartmentid: string;
  housingStockId: string;
  lastDocuments: DocumentResponse[];
  handleSaveFile: (document: DocumentResponse) => void;

};
