import {
  ApartmentActResponse,
  DocumentResponse,
  EActTypeStringDictionaryItem,
} from 'myApi';

export type ActCardItemProps = {
  act: ApartmentActResponse;
  actTypes: EActTypeStringDictionaryItem[];
  handleSaveFile: (document: DocumentResponse) => void;
};
