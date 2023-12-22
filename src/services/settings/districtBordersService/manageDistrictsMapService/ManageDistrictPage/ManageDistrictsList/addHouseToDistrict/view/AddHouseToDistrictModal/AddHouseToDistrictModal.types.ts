import { HousingStockResponse } from 'api/types';
import { DistrictData } from 'types';
import {
  AddHouseToDistrictRequestPayload,
  GetBuildingFilters,
} from '../../addHouseToDistrictService.types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';

export type Props = {
  isOpen: boolean;
  openedDistrict: DistrictData | null;
  closeAddHouseModal: () => void;
  organizationCoordinates: OrganizationCoordinates | null;
  house: HousingStockResponse | null;
  hasError: boolean;
  handleSearchHouse: (payload: GetBuildingFilters) => void;
  addHouse: (payload: AddHouseToDistrictRequestPayload) => void;
  isLoading: boolean;
  districtsList: DistrictData[];
};
