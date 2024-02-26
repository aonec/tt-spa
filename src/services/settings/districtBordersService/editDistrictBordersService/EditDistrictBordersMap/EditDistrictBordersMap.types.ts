import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictResponse,
  House,
} from 'api/types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';
import { DistrictColor } from 'types';

export type Props = {
  districtId: string;
  organizationCoordinates: OrganizationCoordinates | null;
  existingHousingStocks: BuildingWithCoordinatesResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoadingHousingStocks: boolean;
  isLoadingDistricts: boolean;
  isLoadingUpdateDistrict: boolean;
  handleUpdateDistrictBorder: (coordinates: number[][]) => void;
  handleAddHouse: (housesToAdd: number[]) => void;
  handleDeleteHouse: (housesToDelete: number[]) => void;
};

export type EditindDistrictArrayType = {
  coordinates: number[][][];
  id: string;
  type: DistrictColor;
  name: string;
  isEditing?: boolean | undefined;
  isDrawing?: boolean | undefined;
  houses?: House[] | undefined;
}[];
