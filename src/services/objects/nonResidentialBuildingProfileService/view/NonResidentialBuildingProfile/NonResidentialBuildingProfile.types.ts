import {
  NonResidentialBuildingResponse,
  ResourceDisconnectingResponse,
} from 'myApi';
import { NonResidentialBuildingProfileGrouptype } from '../../nonResidentialBuildingProfileService.constants';

export type NonResidentialBuildingProfileProps = {
  currentGrouptype: NonResidentialBuildingProfileGrouptype;
  setGrouptype: (grouptype: NonResidentialBuildingProfileGrouptype) => void;
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
  isPermitionToAddNode: boolean;
  isPermitionToDownloadConsolidatedReport: boolean;
  isPermissionToEditHousingStock: boolean;
  openConsolidatedReportModal: () => void;
  resourceDisconnections: ResourceDisconnectingResponse[];
};
