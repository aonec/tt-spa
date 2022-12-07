import { CreatePipeHousingMeteringDeviceInNodeRequest, EResourceType } from 'myApi';

export type AddCommonDeviceFormProps = {
  formId: string;
  currentFormStep: string;
  updateRequestPayload: (
    payload: CreatePipeHousingMeteringDeviceInNodeRequest
  ) => void;
  resource: EResourceType;
};
