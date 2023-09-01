import { HousingStockResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';
import { DistrictData } from 'types';
import { GetBuildingFilters } from '../../addHouseToDistrictService.types';

export type Props = {
  isOpen: boolean;
  openedDistrict: DistrictData | null;
  closeAddHouseModal: () => void;
  organizationCoordinates: OrganizationCoordinates | null;
  house: HousingStockResponse | null;
  hasError: boolean;
  handleSearchHouse: (payload: GetBuildingFilters) => void;
};
