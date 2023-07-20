import { axios } from 'api/axios';
import {
  ManagementFirmCompetenceResponse,
  ManagementFirmCompetencesListResponse,
} from 'myApi';

export const getCompetencesCatalog = async (): Promise<
  ManagementFirmCompetenceResponse[] | null
> => {
  const res: ManagementFirmCompetencesListResponse = await axios.get(
    'OrganizationCompetences',
  );
  return res.competences;
};
