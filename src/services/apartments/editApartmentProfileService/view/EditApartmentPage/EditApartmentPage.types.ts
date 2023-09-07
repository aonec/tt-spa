import { ApartmentResponse } from 'api/types';
import {
  EditApartmentCommonInfoFormType,
  TabsSection,
} from '../../editApartmentProfileService.types';

export type EditApartmentPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  tabSection: TabsSection;
  setTabSection: (payload: TabsSection) => void;
  isUpdatingApartmentLoading: boolean;
  commonDataForm: EditApartmentCommonInfoFormType;
};
