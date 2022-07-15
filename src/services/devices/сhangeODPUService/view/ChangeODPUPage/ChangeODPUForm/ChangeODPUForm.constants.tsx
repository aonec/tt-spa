import { EClosingReason, EPhaseNumberType, EYearQuarter } from 'myApi';
import { SwitchElectricHousingDeviceRequestFormPayload } from './ChangeODPUForm.types';
import * as yup from 'yup';

export const initialValues: SwitchElectricHousingDeviceRequestFormPayload = {
  model: '',
  serialNumber: '',
  bitDepth: '',
  scaleFactor: '',
  openingDate: null,
  manufactureYear: null,
  stateVerificationQuarter: null,
  stateVerificationYear: null,
  nextStateVerificationYear: null,
  stateVerificationIntervalYears: '',
  oldDeviceClosingReason: null,
  sealNumber: '',
  sealInstallationDate: null,
  oldDeviceReadings: [],
  newDeviceReadings: [],
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

export const switchDeviceValidationSchema = yup.object().shape({
  model: yup.string().required('Это поле обязательное'),
  serialNumber: yup.string().required('Это поле обязательное'),
  bitDepth: yup.string().required('Это поле обязательное'),
  scaleFactor: yup.string().required('Это поле обязательное'),
  openingDate: yup.string().nullable().required('Это поле обязательное'),
  oldDeviceClosingReason: yup
    .string()
    .nullable()
    .required('Это поле обязательное'),
});
