import { Event } from 'effector';
import { ApartmentResponse } from 'myApi';
import { PersonalNumberFormTypes } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PersonalNumberForm.types';

export type EditPersonalNumberPageProps = {
  isLoading: boolean;
  apartment: ApartmentResponse | null;
  handleEditHomeownerAccount: (payload: PersonalNumberFormTypes) => void;
  handleForced: Event<void>
};
