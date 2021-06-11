import { EManagingFirmUserDismissialStatusTypeStringDictionaryItem } from './../../myApi';
import axios from '01/axios';

export const fetchStatuses = (): Promise<
  EManagingFirmUserDismissialStatusTypeStringDictionaryItem[] | null
> => axios.get('ManagingFirmUserDismissalStatuses');
