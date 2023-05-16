import {
  HousingStockAddressCreateRequest,
  HousingStockAddressResponse,
  HousingStockAddressUpdateRequest,
} from 'myApi';

export type AddressTabProps = {
  address: HousingStockAddressResponse;
  index: string | null;
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
  isDeleteLoading: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
};
