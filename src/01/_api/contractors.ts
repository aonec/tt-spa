import {
  ContractorListResponse,
  ContractorCreateRequest,
  ContractorResponse,
} from "../../api/types";
import axios from "../../api/axios";

export const postContractors = (
  requestPayload: ContractorCreateRequest
): Promise<ContractorResponse> => {
  return axios.post("Contractors", requestPayload);
};

export const requestContractors = (): Promise<ContractorListResponse> =>
  axios.get("Contractors");

export const deleteContractor = (id: number): Promise<ContractorResponse> =>
  axios.delete(`Contractors/${id}`);
