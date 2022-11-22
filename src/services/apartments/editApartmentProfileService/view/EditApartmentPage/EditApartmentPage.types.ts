import { ApartmentResponse } from 'myApi';
import { TabsSection } from '../../editApartmentProfileService.types';

export type EditApartmentPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  tabSection: TabsSection;
  setTabSection: (payload: TabsSection) => void;
};
