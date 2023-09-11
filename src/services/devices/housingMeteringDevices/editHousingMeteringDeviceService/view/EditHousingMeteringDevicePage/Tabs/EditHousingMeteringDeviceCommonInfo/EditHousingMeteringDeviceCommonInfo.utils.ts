import {
  EHousingMeteringDeviceType,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'api/types';
import { EditHousingMeteringDeviceCommonInfoFormTypes } from './EditHousingMeteringDeviceCommonInfo.types';

export const getUpdateNodeDataFromFormik = (
  values: EditHousingMeteringDeviceCommonInfoFormTypes,
): UpdatePipeHousingMeteringDeviceRequest => ({
  serialNumber: values.serialNumber,
  lastCheckingDate: values.lastCheckingDate?.format(),
  futureCheckingDate: values.futureCheckingDate?.format(),
  housingMeteringDeviceType:
    values.housingMeteringDeviceType as EHousingMeteringDeviceType,
  resource: values.resource,
  model: values.model,
  communicationPipeId: values.communicationPipeId || undefined,
});
