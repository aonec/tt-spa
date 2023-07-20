import {
  EHousingMeteringDeviceType,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'api/myApi';
import { EditHousingMeteringDeviceCommonInfoFormTypes } from './EditHousingMeteringDeviceCommonInfo.types';

export const getUpdateNodeDataFromFormik = (
  values: EditHousingMeteringDeviceCommonInfoFormTypes,
): UpdatePipeHousingMeteringDeviceRequest => ({
  serialNumber: values.serialNumber,
  lastCheckingDate: values.lastCheckingDate?.toISOString(true),
  futureCheckingDate: values.futureCheckingDate?.toISOString(true),
  housingMeteringDeviceType:
    values.housingMeteringDeviceType as EHousingMeteringDeviceType,
  resource: values.resource,
  model: values.model,
  communicationPipeId: values.communicationPipeId || undefined,
});
