import { axios } from '01/axios';
import {
  ContractorListResponsePagedList,
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';

export async function getCurrentManagingFirm(): Promise<OrganizationResponse | null> {
  return await axios.get('Organizations/current');
}

export async function getManagingFirmUsers(): Promise<OrganizationUserListResponsePagedList | null> {
  return await axios.get('OrganizationUsers');
}

export async function getContractors(): Promise<ContractorListResponsePagedList | null> {
  return await axios.get('Contractors');
}

export async function putCurrentManagingFirm(id = 0, form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Organizations/${id}`, form);
    alert('Компания успешно изменена!');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error as any);
  }
}

export async function postContractor(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post('Contractors', form);
    alert('Подрядчик успешно создан!');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error as any);
  }
}

export async function postStaff(form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.post('OrganizationUsers', form);
    alert('Сотрудник успешно создан!');
    return res;
  } catch (error) {
    alert(
      'Что-то пошло не так: скорее всего уже есть пользователь с таким email \n'
    );
  }
}
