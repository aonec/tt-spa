import { ApartmentActResponse, DocumentResponse, EActTypeStringDictionaryItem } from 'myApi';

export type ApartmentActItemProps = {
  act: ApartmentActResponse;
  actTypes: EActTypeStringDictionaryItem[] | null;
  openDeleteActModal: (actId: number) => void;
  openEditActModal: (act:  ApartmentActResponse ) => void;
  saveFile: (document: DocumentResponse) => void;
};
