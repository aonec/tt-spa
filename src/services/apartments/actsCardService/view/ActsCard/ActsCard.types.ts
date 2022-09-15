import {
  ApartmentActResponse,
  DocumentResponse,
  EActTypeStringDictionaryItem,
} from 'myApi';

export type ActsCardProps = {
  acts: ApartmentActResponse[];
  actTypes: EActTypeStringDictionaryItem[];
  apartmentid: string;
  housingStockId: string;
  handleSaveFile: (document: DocumentResponse) => void;
};
