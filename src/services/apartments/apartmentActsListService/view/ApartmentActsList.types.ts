import {
  ApartmentActResponse,
  DocumentResponse,
  EActResourceType,
  EActType,
  EActTypeStringDictionaryItem,
} from 'myApi';

export type ApartmentActsListProps = {
  acts: ApartmentActResponse[];
  isLoading: boolean;
  handleOpeningCreateActModal: () => void;
  handleOpeningDeleteActModal: (actId: number) => void;
  handleOpeningEditActModal: (act: ApartmentActResponse) => void;
  handleSaveFile: (document: DocumentResponse) => void;
  handleUpdateTypes: (types: EActType[]) => void;
  handleUpdateResources: (resources: EActResourceType[]) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
};
