import { axios } from '01/axios';
import {
  ContractorListResponsePagedList,
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';

export function getCurrentManagingFirm(): Promise<OrganizationResponse | null> {
  return axios.get('Organizations/current');
}

export function getManagingFirmUsers(): Promise<OrganizationUserListResponsePagedList | null> {
  return axios.get('OrganizationUsers');
}

export function getContractors(): Promise<ContractorListResponsePagedList | null> {
  return axios.get('Contractors');
}
