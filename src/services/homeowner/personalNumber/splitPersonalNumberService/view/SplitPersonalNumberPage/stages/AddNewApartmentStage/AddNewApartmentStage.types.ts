import { ApartmentResponse } from 'api/types';
import { AddNewApartmentStage } from 'services/homeowner/personalNumber/splitPersonalNumberService/splitPersonalNumberService.types';

export type AddNewApartmentStageProps = {
  formId: string;
  apartment: ApartmentResponse | null;
  handleSubmitAddNewApartmentStage: (payload: AddNewApartmentStage) => void;
  addNewApartmentStageData: AddNewApartmentStage | null;
};
