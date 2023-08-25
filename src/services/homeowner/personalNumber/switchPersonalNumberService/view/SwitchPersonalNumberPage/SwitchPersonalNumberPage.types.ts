import { Event } from 'effector';
import { ApartmentResponse, HomeownerAccountListResponse } from 'api/types';
import { PersonalNumberFormTypes } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PersonalNumberForm.types';

export type SwitchPersonalNumberPageProps = {
  isLoading: boolean;
  apartment: ApartmentResponse | null;
  handleSwitchHomeownerAccount: (payload: {
    replaceableAccountId: string;
    form: PersonalNumberFormTypes;
  }) => void;
  handleForced: Event<void>;
  homeowner: HomeownerAccountListResponse | undefined;
};
