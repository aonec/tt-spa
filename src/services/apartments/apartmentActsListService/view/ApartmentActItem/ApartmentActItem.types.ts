import { ApartmentActResponse, EActTypeStringDictionaryItem } from 'myApi';

export type ApartmentActItemProps = {
  act: ApartmentActResponse;
  actTypes: EActTypeStringDictionaryItem[] | null;
  openDeleteActModal: (actId: number) => void;
  openEditActModal: (act:  ApartmentActResponse ) => void;
};
