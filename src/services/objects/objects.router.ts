import { EHouseCategory } from 'myApi';

export const objectRouteFromCategory: { [key in EHouseCategory]: string } = {
  [EHouseCategory.Living]: 'living',
  [EHouseCategory.NonResidential]: 'nonResidential',
};
