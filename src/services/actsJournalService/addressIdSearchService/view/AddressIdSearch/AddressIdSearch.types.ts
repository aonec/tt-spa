import { FindAddressFilter } from '../../addressIdSearchService.types';

export type AddressIdSearchProps = {
  getApartmentId: () => void;
  setAddress: (payload: FindAddressFilter) => void;
  addressFilter: FindAddressFilter;
  onEnter?: (index: number) => void;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  dataKey: string;
};
