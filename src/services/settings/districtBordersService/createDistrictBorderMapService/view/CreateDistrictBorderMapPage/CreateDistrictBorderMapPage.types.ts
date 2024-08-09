import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'api/types';
import { CreatingDistrictPayload } from '../../createDistrictBorderMapService.types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';
import { DistrictColor } from 'types';
import { EventCallable } from 'effector';

export type Props = {
  existingHousingStocks: BuildingWithCoordinatesResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
  preselectedDistrictPayload: CreatingDistrictPayload | null;
  organizationCoordinates: OrganizationCoordinates | null;
  isLoadingPostDistrict: boolean;
  setDistrictPayload: EventCallable<CreatingDistrictPayload>;
};

export type FormType = {
  isEditing: boolean;
  selectedHouses: number[];
  name: string;
  color: DistrictColor;
  formSection: number;
};
