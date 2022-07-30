import { EResourceType } from '../../../../../../../api/types';
import {
  NodeCommercialRegistrationRequestPayload,
  unsetNodeCommercialRegistrationRequestPayload,
} from '../../nodeCommercialRegistrationService.types';

export type RegisterNodeOnCommercialAccountingFormProps = {
  handleSubmit: (payload: NodeCommercialRegistrationRequestPayload) => void;
  isRegistered: boolean;
  resource: EResourceType;
  handleSubmitUnset: (
    payload: unsetNodeCommercialRegistrationRequestPayload
  ) => void;
  formId: string
};
