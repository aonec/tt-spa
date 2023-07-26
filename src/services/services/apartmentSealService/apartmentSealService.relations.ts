import { sample } from 'effector';
import { createSealService } from '../createSealService';
import { apartmentSealService } from './apartmentSealService.model';

sample({
  clock: createSealService.inputs.workWithSealSucceed,
  target: apartmentSealService.inputs.refetchAppointment,
});
