import {
  NonResidentialBuildingResponse,
  ResourceDisconnectingResponse,
} from 'api/types';

export type NonResidentialBuildingInfoProps = {
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
  resourceDisconnections: ResourceDisconnectingResponse[];
};
