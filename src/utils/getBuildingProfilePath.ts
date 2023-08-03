import { EHouseCategory } from 'api/types';

export const getBuildingProfilePath = (houseCategory: EHouseCategory) => {
  if (houseCategory === EHouseCategory.Living) {
    return 'livingProfile';
  } else {
    return 'nonResidentialProfile';
  }
};
