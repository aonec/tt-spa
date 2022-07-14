interface PhasesTypes {
  [key: string]: boolean;
}

export interface ElectricPhasesProps {
  values: any;
  setFieldValue: (key: string, value: string) => void;
  amountOfPhases: 1 | 3;
  phasesStatus: PhasesTypes;
}
