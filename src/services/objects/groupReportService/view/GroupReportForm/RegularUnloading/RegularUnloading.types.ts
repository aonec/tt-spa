import {
  GroupReportContractorResponse,
  GroupReportConfigurationPeriod,
} from 'api/types';
import { RegularUnloadSubscription } from 'services/objects/groupReportService/groupReportService.types';

export type RegularUnloadingProps = {
  handleChangeEmail: (email?: string) => void;
  handleChangeContractorIds: (ids?: string[]) => void;
  handleThriggerAt: (date?: string) => void;
  handleChangeIsRegular: (isRegular: boolean) => void;
  contractors: GroupReportContractorResponse[];
  values: RegularUnloadSubscription & { isRegular: boolean };
  errors: RegularUnloadingErrors;
  handleChangeSubsType: (value?: GroupReportConfigurationPeriod) => void;
  setRegularUpload: (payload: boolean) => void;
};

type RegularUnloadingErrors = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: string;
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: string;
};
