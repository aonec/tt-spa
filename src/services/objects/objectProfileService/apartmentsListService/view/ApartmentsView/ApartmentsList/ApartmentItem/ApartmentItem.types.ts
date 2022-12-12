import { ApartmentListResponse } from 'myApi';

export type ApartmentItemProps = {
  apartment: ApartmentListResponse;
  hosuingStockId: number;
  setCurrentApartmentId: (id: number) => void;
};
