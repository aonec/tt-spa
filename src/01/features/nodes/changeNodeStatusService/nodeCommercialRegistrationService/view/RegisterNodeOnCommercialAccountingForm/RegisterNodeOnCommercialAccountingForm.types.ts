import { ENodeCommercialAccountStatus, EResourceType } from 'myApi';
import {
  ElectricNodeCommercialRegistrationRequestPayload,
  NodeCommercialRegistrationRequestPayload,
  unsetNodeCommercialRegistrationRequestPayload,
  unsetElectricNodeCommercialRegistrationRequestPayload,
} from '../../nodeCommercialRegistrationService.types';

export type RegisterNodeOnCommercialAccountingFormProps = {
  handleSubmit: (
    payload: any
  ) => void;
  nodeStatus: ENodeCommercialAccountStatus;
  resource: EResourceType;
};
