import { ElevatorExistingType } from './CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';

export const ElevatorDictionary = {
  [ElevatorExistingType.Available]: 'Есть',
  [ElevatorExistingType.NotAvailable]: 'Нет',
};

export const IsElevatorDictionaryBoolean = {
  [ElevatorExistingType.Available]: true,
  [ElevatorExistingType.NotAvailable]: false,
};

export const IsElevatorDictionaryFromBoolean = {
  true: [ElevatorExistingType.Available],
  false: [ElevatorExistingType.NotAvailable],
};

export const getElevatorType = (value: boolean | null) => {
  if (value) return ElevatorExistingType.Available;
  return ElevatorExistingType.NotAvailable;
};
