import { EManagingFirmUserWorkingStatusTypeStringDictionaryItem } from './../../myApi';
import axios from '01/axios';

export const fetchStatuses = (): Promise<
EManagingFirmUserWorkingStatusTypeStringDictionaryItem[] | null
> => axios.get('ManagingFirmUserDismissalStatuses');
