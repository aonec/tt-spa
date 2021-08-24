import axios from '01/axios';
import {
  ManagementFirmCompetenceResponse,
} from './../../myApi';

export const getCompetencesCatalog = async (): Promise<
  ManagementFirmCompetenceResponse[] | null
> => {
  const res: {
    items: ManagementFirmCompetenceResponse[] | null;
  } = await axios.get('ManagementFirmCompetences');
  return res?.items;
};
