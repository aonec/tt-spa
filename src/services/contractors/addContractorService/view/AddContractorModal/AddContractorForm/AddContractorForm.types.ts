import { ContractorCreateRequest } from 'myApi';

export type AddContractorFormProps = {
  formId: string;
  handleAddcontractor: (payload: ContractorCreateRequest) => void;
};
