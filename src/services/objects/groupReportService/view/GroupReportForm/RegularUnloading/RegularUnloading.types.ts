import { EEmailSubscriptionType, GroupReportContractorResponse } from 'myApi';
import { RegularUnloadSubscription } from 'services/objects/groupReportService/groupReportService.types';

export type RegularUnloadingProps = {
  handleChangeEmail: (email?: string) => void;
  handleChangeContractorIds: (ids?: number[]) => void;
  handleThriggerAt: (date?: string) => void;
  handleChangeSubsType: (type?: EEmailSubscriptionType) => void;
  contractors: GroupReportContractorResponse[];
  values: RegularUnloadSubscription;
};
