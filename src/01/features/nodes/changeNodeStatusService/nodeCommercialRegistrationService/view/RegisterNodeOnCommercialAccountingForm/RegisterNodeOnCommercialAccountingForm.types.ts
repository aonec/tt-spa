import { ENodeCommercialAccountStatus, EResourceType } from 'myApi';
import {
  NodeCommercialRegistrationRequestPayload,
  unsetNodeCommercialRegistrationRequestPayload,
} from '../../nodeCommercialRegistrationService.types';

export type RegisterNodeOnCommercialAccountingFormProps = {
  handleSubmit: (payload: NodeCommercialRegistrationRequestPayload) => void;
  status: boolean;
  resource: EResourceType;
  handleSubmitUnset: (
    payload: unsetNodeCommercialRegistrationRequestPayload
  ) => void;
  formId: string
};
