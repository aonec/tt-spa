import { EHousingMeteringDeviceType, EMagistralType } from 'myApi';
import { EditHousingMeteringDeviceCommonInfoFormTypes } from './EditHousingMeteringDeviceCommonInfo.types';

export const getUpdateNodeDataFromFormik = (
  values: EditHousingMeteringDeviceCommonInfoFormTypes,
) => ({
  serialNumber: values.serialNumber,
  lastCheckingDate: values.lastCheckingDate?.toISOString(true),
  futureCheckingDate: values.futureCheckingDate?.toISOString(true),
  housingMeteringDeviceType:
    values.housingMeteringDeviceType as EHousingMeteringDeviceType,
  resource: values.resource,
  model: values.model,
  pipe: {
    diameter: Number(values.diameter),
    pipeNumber: Number(values.pipeNumber),
    magistral: values.magistral as EMagistralType,
  },
});
