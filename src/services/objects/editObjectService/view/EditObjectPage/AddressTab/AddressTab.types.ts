import {
  BuildingAddressCreateRequest,
  BuildingAddressResponse,
  BuildingAddressUpdateRequest,
} from 'myApi';

export type AddressTabProps = {
  address: BuildingAddressResponse;
  existingCities: string[] | null;
  existingStreets: string[];
  onPageCancel: () => void;
  handleCreateHousingStockAddress: (
    payload: BuildingAddressCreateRequest,
  ) => void;
  handleDeleteHousingStockAddress: (payload: { addressId: number }) => void;
  handleUpdateHousingStockAddress: (payload: {
    addressId: number;
    data: BuildingAddressUpdateRequest;
  }) => void;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  handleRefetchHousingStock: () => void;
};
