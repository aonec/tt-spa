import {
  BuildingAddressResponse,
  ResourceDisconnectingCreateRequest,
} from 'api/types';

export type CreateDisconnectionContainerProps = {
  handleCreateDisconnectionState?: (
    payload: ResourceDisconnectingCreateRequest,
  ) => void;
  handleComplete?: () => void;
  dateFrom?: string | null;
  preselectedAddress?: BuildingAddressResponse | null;
};

export enum EAddressDetails {
  All = 'All',
  HouseManagements = 'HouseManagements',
  HeatingStation = 'HeatingStation',
}
