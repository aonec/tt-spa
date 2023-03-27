import { ApartmentResponse } from 'myApi';

export type ApartmentProfileProps = {
  apartment: ApartmentResponse | null;
  isApartmentLoading: boolean;
  tabSection?: ApartmentSection;
  isPermitionToEditApartment: boolean;
};

export enum ApartmentSection {
  CommonData = 'commonData',
  Testimony = 'testimony',
  Homeowners = 'homeowners',
  ActsJournal = 'actsJournal',
}
