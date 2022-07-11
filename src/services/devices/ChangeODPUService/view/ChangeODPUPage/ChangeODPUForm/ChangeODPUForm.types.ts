import { EPhaseNumberType } from 'myApi';

export type ChangeODPUFormProps = {};

export const ODPUPhaseDictionary = [
  { key: EPhaseNumberType.SinglePhase, value: 'Однофазный счетчик' },
  { key: EPhaseNumberType.ThreePhase, value: 'Трехфазный счетчик' },
];
