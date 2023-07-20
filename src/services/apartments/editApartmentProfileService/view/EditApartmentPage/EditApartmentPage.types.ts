import { ApartmentResponse } from 'api/types';
import {
  PutApartment,
  TabsSection,
} from '../../editApartmentProfileService.types';

export type EditApartmentPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  tabSection: TabsSection;
  setTabSection: (payload: TabsSection) => void;
  handleUpdateApartment: (payload: PutApartment) => void;
  isUpdatingApartmentLoading: boolean;
};
