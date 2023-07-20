import { ContractorCreateRequest, ContractorUpdateRequest } from 'api/myApi';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

export type AddContractorFormProps = {
  formId: string;
  handleAddcontractor?: (payload: ContractorCreateRequest) => void;
  handleEditcontractor?: (payload: {
    contractorId: number;
    data: ContractorUpdateRequest;
  }) => void;
  contractorData?: ContractorDataType | null;
};
