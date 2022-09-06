import { ContractorListResponse } from 'myApi';

export type EmailNotifySelectProps = {
  contractors: ContractorListResponse[];
  handleContractorChange: (contractorIds: number[]) => void;
};
