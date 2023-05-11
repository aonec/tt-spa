import { ApartmentResponse } from 'myApi';
import { AddNewApartmentStage } from 'services/homeowner/personalNumber/splitPersonalNumberService/splitPersonalNumberService.types';

export type AddNewApartmentStageProps = {
  formId: string;
  apartment: ApartmentResponse | null;
  handleSubmitAddNewApartmentStage: (payload: AddNewApartmentStage) => void;
};
