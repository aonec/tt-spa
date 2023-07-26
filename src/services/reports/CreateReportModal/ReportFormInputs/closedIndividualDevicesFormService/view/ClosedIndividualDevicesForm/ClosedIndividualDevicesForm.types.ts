import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
import { UnloadingType } from '../../closedIndividualDevicesFormService.types';

export type ClosedIndividualDevicesFormProps = {
  unloadSelectType: UnloadingType | null;
  setUnloadSelectType: (payload: UnloadingType) => void;
  preparedAddresses: TreeSelectElement[];
  organizationPagedList: OrganizationResponsePagedList | null;
  houseManagementList: HouseManagementResponse[] | null;
  selectedCity: string | null;
  selectCity: (city: string) => void;
  existingCities: string[];
};
