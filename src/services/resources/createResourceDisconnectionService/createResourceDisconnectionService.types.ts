import { EResourceType, ResourceDisconnectingCreateRequest } from 'api/types';

export type CreateDisconnectionContainerProps = {
  handleCreateDisconnectionState?: (
    payload: ResourceDisconnectingCreateRequest,
  ) => void;
  handleComplete?: () => void;
  dateFrom?: string | null;
  preselectedBuilding?: number | null;
  defaultResource?: EResourceType | null;
};

export enum EAddressDetails {
  All = 'All',
  HouseManagements = 'HouseManagements',
  HeatingStation = 'HeatingStation',
}
