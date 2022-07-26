import axios from '../../api/axios';
import {
  ManagementFirmCompetenceResponse,
  ManagementFirmCompetencesListResponse,
} from '../../api/types';

export const getCompetencesCatalog = async (): Promise<
  ManagementFirmCompetenceResponse[] | null
> => {
  const res: ManagementFirmCompetencesListResponse = await axios.get(
    'ManagementFirmCompetences'
  );
  return res.competences;
};
