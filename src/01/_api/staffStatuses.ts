import { EOrganizationUserWorkingStatusTypeStringDictionaryItem } from 'myApi';
import axios from '01/axios';

export const fetchStatuses = (): Promise<
  EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null
> => axios.get('ManagingFirmUserWorkingStatuses');
