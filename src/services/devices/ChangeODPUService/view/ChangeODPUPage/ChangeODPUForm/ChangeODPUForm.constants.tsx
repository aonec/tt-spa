import {
  EClosingReason,
  EPhaseNumberType,
  EYearQuarter,
  SwitchHousingDeviceReadingsCreateRequest,
} from 'myApi';

export const initialValues = {
  model: '',
  serialNumber: '',
  bitDepth: '',
  scaleFactor: '',
  openingDate: null as string | null,
  manufactureYear: null as string | null,
  stateVerificationQuarter: null as EYearQuarter | null,
  stateVerificationYear: null as string | null,
  nextStateVerificationYear: null as string | null,
  stateVerificationIntervalYears: '',
  oldDeviceClosingReason: null as EClosingReason | null,
  sealNumber: '',
  sealInstallationDate: null as string | null,
  oldDeviceReadings: [] as SwitchHousingDeviceReadingsCreateRequest[],
  newDeviceReadings: [] as SwitchHousingDeviceReadingsCreateRequest[],
};

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
