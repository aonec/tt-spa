import { DistrictResponse } from 'myApi';

export type Props = {
  districtsList: DistrictResponse[];
  handleSelectDistrict: (payload: string) => void;
  selectedDistrict: string | null;
};
