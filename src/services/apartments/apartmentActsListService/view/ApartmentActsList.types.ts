import { ApartmentActResponse, EActTypeStringDictionaryItem } from 'myApi';

export type ApartmentActsListProps = {
  acts: ApartmentActResponse[] | null;
  isLoading: boolean;
  handleOpeningCreateActModal: () => void;
  handleOpeningDeleteActModal: (actId: number) => void;
  actTypes: EActTypeStringDictionaryItem[] | null;
};
