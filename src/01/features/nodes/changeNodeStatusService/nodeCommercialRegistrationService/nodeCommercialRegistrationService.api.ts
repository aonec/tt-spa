import { axios } from '01/axios';
import {
  NodeCommercialRegistrationRequestPayload,
  unsetNodeCommercialRegistrationRequestPayload,
} from './nodeCommercialRegistrationService.types';

const pathLookUp = {
  pipe: 'PipeNodes',
  electric: 'ElectricNodes',
};
export const registerPipeNode = (
  payload: NodeCommercialRegistrationRequestPayload
): Promise<void> => {
  return axios.post(
    `/${pathLookUp[payload.type]}/${payload.nodeId}/SetRegisteredStatus`,
    payload.data
  );
};

export const unsetPipeNode = (
  payload: unsetNodeCommercialRegistrationRequestPayload
): Promise<void> => {
  return axios.post(
    `/${pathLookUp[payload.type]}/${payload.nodeId}/SetNotRegisteredStatus`,
    payload.data
  ); 
};
