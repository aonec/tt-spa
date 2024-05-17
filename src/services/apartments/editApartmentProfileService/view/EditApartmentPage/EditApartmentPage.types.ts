import { ApartmentResponse } from 'api/types';
import { TabsSection } from '../../editApartmentProfileService.types';
import { EditCommonDataForm } from './EditCommonDataForm/EditCommonDataForm.types';

export type EditApartmentPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  tabSection: TabsSection;
  setTabSection: (payload: TabsSection) => void;
  isUpdatingApartmentLoading: boolean;
  commonDataInitialValues: EditCommonDataForm;
  handleEditCommonData: (payload: EditCommonDataForm) => void;
};
