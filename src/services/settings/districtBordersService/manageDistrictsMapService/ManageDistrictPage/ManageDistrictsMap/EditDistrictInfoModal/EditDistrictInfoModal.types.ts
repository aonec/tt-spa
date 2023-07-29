import { DistrictData } from 'types';
import { UpdateDistrictRequestPayload } from '../../../manageDistrictsMapService.types';

export type Props = {
  closeEditDistrictModal: () => void;
  districtData: DistrictData;
  isLoading: boolean;
  updateDistrict: (payload: UpdateDistrictRequestPayload) => void;
};
