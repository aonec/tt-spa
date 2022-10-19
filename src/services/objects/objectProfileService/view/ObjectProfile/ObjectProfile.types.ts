import { HousingStockResponse } from 'myApi';
import { ObjectProfileGrouptype } from '../../objectProfileService.constants';

export type ObjectProfileProps = {
  housingStock: HousingStockResponse;
  currentGrouptype: ObjectProfileGrouptype;
  setCurrentGrouptype: (grouptype: ObjectProfileGrouptype) => void;
};
