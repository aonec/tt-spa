import { EYearQuarter } from './../../../../../../myApi';
import { EPhaseNumberType, EClosingReason } from 'myApi';

export type ChangeODPUFormProps = {};

export const ODPUPhaseDictionary = [
  { key: EPhaseNumberType.SinglePhase, value: 'Однофазный счетчик' },
  { key: EPhaseNumberType.ThreePhase, value: 'Трехфазный счетчик' },
];

export const closingReasonDictionary = [
  { key: EClosingReason.Manually, value: 'Плановая замена' },
  { key: EClosingReason.DeviceBroken, value: 'Поломка' },
];

export const yearQuarterDictionary = [
  { key: EYearQuarter.First, value: 1 },
  { key: EYearQuarter.Second, value: 2 },
  { key: EYearQuarter.Third, value: 3 },
  { key: EYearQuarter.Forth, value: 4 },
];
