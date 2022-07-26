import { EPhaseNumberType, EYearQuarter } from '../../api/types';

export const ElectricNodePhaseDictionary = [
  { key: EPhaseNumberType.SinglePhase, value: 'Однофазный счетчик' },
  { key: EPhaseNumberType.ThreePhase, value: 'Трехфазный счетчик' },
];

export const yearQuarterDictionary = [
  { key: EYearQuarter.First, value: 1 },
  { key: EYearQuarter.Second, value: 2 },
  { key: EYearQuarter.Third, value: 3 },
  { key: EYearQuarter.Forth, value: 4 },
];
