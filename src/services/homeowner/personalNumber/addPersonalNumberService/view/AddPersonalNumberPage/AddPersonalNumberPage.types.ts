import { Event } from 'effector';
import { ApartmentResponse } from 'api/types';
import { PersonalNumberFormTypes } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PersonalNumberForm.types';

export type AddPersonalNumberPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  handleAddPersonalNumber: (payload: PersonalNumberFormTypes) => void;
  handleForced: Event<void>;
};
