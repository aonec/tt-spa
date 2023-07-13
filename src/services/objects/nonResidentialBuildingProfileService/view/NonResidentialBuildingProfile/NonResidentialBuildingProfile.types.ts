import { NonResidentialBuildingResponse } from 'myApi';
import { NonResidentialBuildingProfileGrouptype } from '../../nonResidentialBuildingProfileService.constants';

export type NonResidentialBuildingProfileProps = {
  currentGrouptype: NonResidentialBuildingProfileGrouptype;
  setGrouptype: (grouptype: NonResidentialBuildingProfileGrouptype) => void;
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
};
