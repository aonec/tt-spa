import { DistrictColorsList } from 'dictionaries';
import { DistrictColor } from 'types';

export const getDistrictColor = (type: DistrictColor) => {
  return DistrictColorsList.find((elem) => elem.type === type) || null;
};
