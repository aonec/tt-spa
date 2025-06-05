import { ApartmentActResponse } from 'api/types';

export type ActsListItemProps = {
  act: ApartmentActResponse;
  handleOpenDoc: (payload: number) => void;
};
