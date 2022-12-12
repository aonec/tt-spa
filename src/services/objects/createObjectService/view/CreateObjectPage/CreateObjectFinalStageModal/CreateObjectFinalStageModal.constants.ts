import { ElevatorExistingType } from './CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';

export const ElevatorDictionary = {
  [ElevatorExistingType.Available]: 'Есть',
  [ElevatorExistingType.NotAvailable]: 'Нет',
};

export const IsElevatorDictionaryBoolean = {
  [ElevatorExistingType.Available]: true,
  [ElevatorExistingType.NotAvailable]: false,
};
