import { createEffect, createEvent, createStore } from 'effector';
import {
  EExpiresCheckingDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  EOrderByRule,
  EResourceType,
  NodesPagedList,
} from '../../api/types';

interface RequestPayload {
  CalculatorId?: number | null;
  IsConnected?: boolean | null;
  HousingStockId?: number | null;
  'Address.City'?: string | null;
  'Address.Street'?: string | null;
  'Address.HousingStockNumber'?: string | null;
  'Address.Corpus'?: string | null;
  'Address.HouseCategory'?: EHouseCategory | null;
  Resource?: EResourceType | null;
  NodeStatus?: ENodeCommercialAccountStatus | null;
  'DevicesFilter.ExpiresCheckingDateAt'?: EExpiresCheckingDateAt | null;
  'DevicesFilter.Model'?: string | null;
  'DevicesFilter.Question'?: string | null;
  'DevicesFilter.DiameterRange.From'?: number | null;
  'DevicesFilter.DiameterRange.To'?: number | null;
  'CommercialDateRange.From'?: string | null;
  'CommercialDateRange.To'?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export type GetNodesRequestPayload = RequestPayload;

export const $nodes = createStore<NodesPagedList | null>(null);

export const $pipeNodes = $nodes.map((nodes) => nodes?.pipeNodes);
export const $electricNodes = $nodes.map((nodes) => nodes?.electricNodes);

export const fetchNodes = createEffect<RequestPayload, NodesPagedList>();

export const resetNodes = createEvent();
