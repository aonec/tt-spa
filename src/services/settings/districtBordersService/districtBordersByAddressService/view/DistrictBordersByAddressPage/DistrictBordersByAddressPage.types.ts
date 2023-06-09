import { StreetWithHousingStockNumbersResponse } from 'myApi';
import { FetchAddressQueryType } from '../../districtBordersByAddressService.types';

export type DistrictBordersByAddressPageProps = {
  handleFetchAddress: (payload: FetchAddressQueryType) => void;
  addresses: StreetWithHousingStockNumbersResponse[] | null;
};
