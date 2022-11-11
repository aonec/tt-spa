import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import { TreeSelectElement } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';
import { UnloadingType } from '../../closedIndividualDevicesFormService.types';

export type ClosedIndividualDevicesFormProps = {
  unloadSelectType: UnloadingType | null;
  setUnloadSelectType: (payload: UnloadingType) => void;
  preparedAddresses: TreeSelectElement[];
  organizationPagedList: OrganizationResponsePagedList | null;
  houseManagementList: HouseManagementResponse[] | null;
};
