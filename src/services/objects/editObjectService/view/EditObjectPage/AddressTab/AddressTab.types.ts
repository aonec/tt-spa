import {
  HousingStockAddressCreateRequest,
  HousingStockAddressResponse,
  HousingStockAddressUpdateRequest,
} from 'myApi';

export type AddressTabProps = {
  address: HousingStockAddressResponse;
  existingCities: string[] | null;
  existingStreets: string[];
  onPageCancel: () => void;
  handleCreateHousingStockAddress: (
    payload: HousingStockAddressCreateRequest,
  ) => void;
  handleDeleteHousingStockAddress: (payload: { addressId: number }) => void;
  handleUpdateHousingStockAddress: (payload: {
    addressId: number;
    data: HousingStockAddressUpdateRequest;
  }) => void;
};
