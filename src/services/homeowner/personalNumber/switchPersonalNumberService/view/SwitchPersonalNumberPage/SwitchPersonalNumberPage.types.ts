import { Event } from 'effector';
import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';
import { PersonalNumberFormTypes } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PersonalNumberForm.types';

export type SwitchPersonalNumberPageProps = {
  isLoading: boolean;
  apartment: ApartmentResponse | null;
  handleSwitchHomeownerAccount: (payload: PersonalNumberFormTypes) => void;
  handleForced: Event<void>;
  homeowner: HomeownerAccountListResponse | undefined;
};
