import { ApartmentListResponse } from 'api/types';

export type ApartmentItemProps = {
  apartment: ApartmentListResponse;
  hosuingStockId: number;
  setCurrentApartmentId: (id: number) => void;
};
