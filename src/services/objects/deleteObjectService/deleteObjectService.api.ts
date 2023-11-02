import { axios } from 'api/axios';

export const removeLivingBuilding = (id: number): Promise<void> =>
  axios.delete(`HousingStocks/${id}`);

export const removeNonResidentialBuilding = (id: number): Promise<void> =>
  axios.delete(`NonResidentialBuildings/${id}`);
