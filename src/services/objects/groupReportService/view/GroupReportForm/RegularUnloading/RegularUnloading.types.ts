import {
  GroupReportContractorResponse,
  GroupReportConfigurationPeriod,
  OrganizationUserListResponse,
} from 'api/types';
import { RegularUnloadSubscription } from 'services/objects/groupReportService/groupReportService.types';

export type RegularUnloadingProps = {
  handleChangeOrganizationUserIds: (ids?: number[]) => void;
  handleChangeContractorIds: (ids?: number[]) => void;
  handleThriggerAt: (date?: string) => void;
  handleChangeIsRegular: (isRegular: boolean) => void;
  contractors: GroupReportContractorResponse[];
  values: RegularUnloadSubscription & { isRegular: boolean };
  errors: RegularUnloadingErrors;
  handleChangeSubsType: (value?: GroupReportConfigurationPeriod) => void;
  setRegularUpload: (payload: boolean) => void;
  staffList: OrganizationUserListResponse[];
};

type RegularUnloadingErrors = {
  'Subscription.Email'?: string;
  'Subscription.ContractorIds'?: string;
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: string;
};
