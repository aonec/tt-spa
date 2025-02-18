import {
  GroupReportContractorResponse,
  GroupReportConfigurationSendingPeriodType,
  OrganizationUserListResponse,
} from 'api/types';
import { RegularUnloadSubscription } from 'services/objects/groupReportService/groupReportService.types';

export type RegularUnloadingProps = {
  handleThriggerAt: (date?: string) => void;
  handleChangeIsRegular: (isRegular: boolean) => void;
  contractors: GroupReportContractorResponse[];
  values: RegularUnloadSubscription & { isRegular: boolean };
  errors: RegularUnloadingErrors;
  handleChangeSubsType: (
    value?: GroupReportConfigurationSendingPeriodType,
  ) => void;
  setRegularUpload: (payload: boolean) => void;
  staffList: OrganizationUserListResponse[];
  handleChangeEmail: (emailsHash: string[]) => void;
};

type RegularUnloadingErrors = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: string;
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: string;
};

export type UserWithEmail = {
  key: string;
  value: number;
  name: string | null;
  email: string | null;
};
