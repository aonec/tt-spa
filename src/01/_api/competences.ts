import axios from '01/axios';
import {
  ManagementFirmCompetenceResponse,
  ManagementFirmCompetencesListResponse,
} from './../../myApi';

export const getCompetencesCatalog = async (): Promise<
  ManagementFirmCompetenceResponse[] | null
> => {
  const res: ManagementFirmCompetencesListResponse = await axios.get(
    'ManagementFirmCompetences'
  );
  return res.competences;
};
