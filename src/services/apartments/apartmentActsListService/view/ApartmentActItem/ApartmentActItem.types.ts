import { ApartmentActResponse, DocumentResponse } from 'api/myApi';

export type ApartmentActItemProps = {
  act: ApartmentActResponse;
  openDeleteActModal: (actId: number) => void;
  openEditActModal: (act: ApartmentActResponse) => void;
  saveFile: (document: DocumentResponse) => void;
  isPermitionToChangeApartmentAct: boolean;
};
