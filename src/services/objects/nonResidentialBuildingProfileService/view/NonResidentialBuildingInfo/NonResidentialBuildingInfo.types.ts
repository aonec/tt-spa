import {
  NonResidentialBuildingResponse,
  ResourceDisconnectingResponse,
} from 'myApi';

export type NonResidentialBuildingInfoProps = {
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
  resourceDisconnections: ResourceDisconnectingResponse[];
};
