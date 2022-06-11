import { ApartmentActResponse, EActTypeStringDictionaryItem } from 'myApi';

export type ApartmentActsListProps = {
  acts: ApartmentActResponse[] | null;
  isLoading: boolean;
  handleOpeningCreateActModal: () => void;
  handleOpeningDeleteActModal: (actId: number) => void;
  handleOpeningEditActModal: (act: ApartmentActResponse) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
};
