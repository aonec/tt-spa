import { ResourceDisconnectingCreateRequest } from 'api/types';

export type CreateDisconnectionContainerProps = {
  handleCreateDisconnectionState?: (
    payload: ResourceDisconnectingCreateRequest,
  ) => void;
  handleComplete?: () => void;
  dateFrom?: string | null;
};

export enum EAddressDetails {
  All = 'All',
  HouseManagements = 'HouseManagements',
  HeatingStation = 'HeatingStation',
}
