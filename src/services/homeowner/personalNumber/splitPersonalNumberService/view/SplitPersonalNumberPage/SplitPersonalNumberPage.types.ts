import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';
import {
  AddNewApartmentStage,
  SwitchStage,
} from '../../splitPersonalNumberService.types';

export type SplitPersonalNumberPageProps = {
  stageNumber: number;
  apartment: ApartmentResponse | null;
  homeowner: HomeownerAccountListResponse | undefined;
  handleSubmitSwitchStage: (payload: SwitchStage) => void;
  handleSubmitAddNewApartmentStage: (payload: AddNewApartmentStage) => void;
  goBackStage: () => void;
};
