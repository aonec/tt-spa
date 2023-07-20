import { ContractorListResponse } from 'api/myApi';

export type EmailNotifySelectProps = {
  contractors: ContractorListResponse[];
  handleContractorChange: (contractorIds: number[]) => void;
};
