import { BuildingListResponsePagedList } from 'api/types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';

export type Props = {
  isLoading: boolean;
  existingHousingStocks: BuildingListResponsePagedList | null;
  organizationCoordinates: OrganizationCoordinates | null;
};
