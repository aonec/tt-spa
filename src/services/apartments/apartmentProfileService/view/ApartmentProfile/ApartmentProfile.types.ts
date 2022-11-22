import { ApartmentResponse } from 'myApi';

export type ApartmentProfileProps = {
  apartment: ApartmentResponse | null;
  isApartmentLoading: boolean;
  tabSection: ApartmentSection;
};

export enum ApartmentSection {
  CommonData = 'commonData',
  Testimony = 'testimony',
  Homeowners = 'homeowners',
  Documents = 'documents',
  ActsJournal = 'actsJournal',
}
