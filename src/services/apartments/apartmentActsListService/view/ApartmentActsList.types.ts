import { ApartmentActResponse, DocumentResponse, EActTypeStringDictionaryItem } from 'myApi';

export type ApartmentActsListProps = {
  acts: ApartmentActResponse[] | null;
  isLoading: boolean;
  handleOpeningCreateActModal: () => void;
  handleOpeningDeleteActModal: (actId: number) => void;
  handleOpeningEditActModal: (act: ApartmentActResponse) => void;
  handleSaveFile: (document: DocumentResponse) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
};
