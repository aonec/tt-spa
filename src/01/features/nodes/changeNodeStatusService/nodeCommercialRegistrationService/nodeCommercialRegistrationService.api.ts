import { axios } from '../../api/axios';
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
  const { type } = payload;
  return axios.post(
    `/${pathLookUp[type]}/${payload.nodeId}/SetRegisteredStatus`,
    payload.data
  );
};

export const unsetPipeNode = (
  payload: unsetNodeCommercialRegistrationRequestPayload
): Promise<void> => {
  const { type } = payload;
  return axios.post(
    `/${pathLookUp[type]}/${payload.nodeId}/SetNotRegisteredStatus`,
    payload.data
  );
};
