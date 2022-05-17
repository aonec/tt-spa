import { ENodeCommercialAccountStatus } from 'myApi';
import { NodeCommercialRegistrationRequestPayload } from '../../nodeCommercialRegistrationService.types';

export type RegisterNodeOnCommercialAccountingFormProps = {
  handleSubmit: (payload: NodeCommercialRegistrationRequestPayload) => void;
  nodeStatus: ENodeCommercialAccountStatus,
  lastCommercialAccountingDate: string
};
