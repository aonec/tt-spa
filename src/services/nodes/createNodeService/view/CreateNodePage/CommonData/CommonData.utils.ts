import { uniqueId } from 'lodash';
import moment from 'moment';
import { EMagistralType, EPipeNodeConfig } from 'myApi';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

export const getInitialDateFieldValue = (date?: string | null) => {
  if (!date) return null;

  return moment(date);
};

export const getInitialPipesFromConfig = (config: EPipeNodeConfig) => {
  const RechargePipe: CommunicationPipePayload = {
    magistral: EMagistralType.Recharge,
    devices: [],
    id: uniqueId(),
  };

  const FeedFlowPipe: CommunicationPipePayload = {
    magistral: EMagistralType.FeedFlow,
    devices: [],
    id: uniqueId(),
  };

  const FeedBackFlowPipe: CommunicationPipePayload = {
    magistral: EMagistralType.FeedBackFlow,
    devices: [],
    id: uniqueId(),
  };

  const PipesLookup: {
    [key in EPipeNodeConfig]: CommunicationPipePayload[];
  } = {
    [EPipeNodeConfig.ColdWaterSupply]: [FeedFlowPipe],
    [EPipeNodeConfig.HeatNoRecharge]: [FeedFlowPipe, FeedBackFlowPipe],
    [EPipeNodeConfig.HeatWithRecharge]: [
      FeedFlowPipe,
      FeedBackFlowPipe,
      RechargePipe,
    ],
    [EPipeNodeConfig.HotWaterSupplyNoBackflow]: [FeedFlowPipe],
    [EPipeNodeConfig.HotWaterSupplyWithBackflow]: [
      FeedFlowPipe,
      FeedBackFlowPipe,
    ],
  };

  return PipesLookup[config];
};
