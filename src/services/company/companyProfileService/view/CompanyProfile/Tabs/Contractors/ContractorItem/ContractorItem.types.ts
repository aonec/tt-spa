import { ContractorListResponse } from 'myApi';

export type ContractorItemProps = {
  contractor: ContractorListResponse;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenDeleteContractorModal: () => void;
};
