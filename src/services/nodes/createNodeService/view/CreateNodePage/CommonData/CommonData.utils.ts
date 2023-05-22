import { uniqueId } from 'lodash';
import moment from 'moment';
import {
  EMagistralType,
  ENodeCommercialAccountStatus,
  EPipeNodeConfig,
  NodeSetCommercialStatusRequest,
} from 'myApi';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';
import { ChangeNodeStatusFormik } from 'services/nodes/changeNodeStatusService/view/ChangeNodeStatusForm/ChangeNodeStatusForm.types';

export const getInitialDateFieldValue = (date?: string | null) => {
  if (!date) return null;

  return moment(date);
};

export const getInitialDataForChangeNodeStatusForm = (
  data?: NodeSetCommercialStatusRequest | null,
): ChangeNodeStatusFormik => {
  const commercialStatus = data?.commercialStatus;
  if (!commercialStatus) {
    return {};
  }

  if (
    commercialStatus === ENodeCommercialAccountStatus.OnReview ||
    commercialStatus === ENodeCommercialAccountStatus.Prepared
  ) {
    return { ...data, firstDate: data?.commercialStatusChangingDate };
  }
  if (commercialStatus === ENodeCommercialAccountStatus.NotRegistered) {
    return { ...data, firstDate: data?.commercialAccountingDeregistrationDate };
  }
  return {
    ...data,
    firstDate: data?.startCommercialAccountingDate,
    secondDate: data?.endCommercialAccountingDate,
  };
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
    [EPipeNodeConfig.HeatNoHousingMeteringDevice]: [FeedFlowPipe],
    [EPipeNodeConfig.HotWaterNoDevice]: [],
    [EPipeNodeConfig.ColdWaterNoDevice]: [],
  };

  return PipesLookup[config];
};
