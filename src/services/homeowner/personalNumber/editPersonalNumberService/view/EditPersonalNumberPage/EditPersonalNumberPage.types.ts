import {  HomeownerAccountResponse } from 'myApi';
import { PersonalNumberFormTypes } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PersonalNumberForm.types';

export type EditPersonalNumberPageProps = {
  homeowner: HomeownerAccountResponse | null
  isLoading: boolean;
  handleEditHomeownerAccount: (payload: PersonalNumberFormTypes) => void;
};
