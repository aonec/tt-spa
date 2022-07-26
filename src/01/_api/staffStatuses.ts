import { EOrganizationUserWorkingStatusTypeStringDictionaryItem } from '../../api/types';
import axios from '../../api/axios';

export const fetchStatuses = (): Promise<
  EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null
> => axios.get('ManagingFirmUserWorkingStatuses');
