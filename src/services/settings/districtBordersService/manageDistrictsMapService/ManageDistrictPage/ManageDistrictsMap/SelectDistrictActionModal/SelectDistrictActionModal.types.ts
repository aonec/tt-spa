import { DistrictData } from 'types';

export type Props = {
  isOpen: boolean;
  handleClose: () => void;
  districtData: DistrictData;
  openDeleteDistrictModal: () => void;
  openEditDistrictModal: () => void;
};
