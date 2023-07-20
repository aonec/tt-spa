import { ApartmentListResponse } from 'api/myApi';

export type ApartmentItemProps = {
  apartment: ApartmentListResponse;
  hosuingStockId: number;
  setCurrentApartmentId: (id: number) => void;
};
