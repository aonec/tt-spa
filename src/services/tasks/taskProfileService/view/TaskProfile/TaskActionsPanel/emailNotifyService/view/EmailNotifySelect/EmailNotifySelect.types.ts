import { ContractorListResponse } from 'api/types';

export type EmailNotifySelectProps = {
  contractors: ContractorListResponse[];
  handleContractorChange: (contractorIds: number[]) => void;
};
