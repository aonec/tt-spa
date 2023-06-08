import { createEffect, createEvent, createStore } from 'effector';
import { createForm, Rule } from 'effector-forms';
import {
  EExpiresCheckingDateAt,
  EHouseCategory,
  ENodeCommercialAccountStatus,
  EOrderByRule,
  EResourceType,
  ElectricNodeResponse,
  NodesPagedList,
} from 'myApi';
import { getNodes } from '01/_api/nodes';

export type GetNodesRequestPayload = {
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
};

const rules = {
  required: (): Rule<string> => ({
    name: 'required',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'Это поле обязательно',
    }),
  }),
};

export const accountingNodesFilterForm = createForm({
  fields: {
    city: { init: '' },
    street: { init: '', rules: [rules.required()] },
    house: { init: '', rules: [rules.required()] },
  },
});

export const fetchNodes = createEffect<GetNodesRequestPayload, NodesPagedList>(
  getNodes,
);

export const $electricNodes = createStore<ElectricNodeResponse[]>([]).on(
  fetchNodes.doneData,
  (_, nodes) => nodes?.electricNodes || [],
);

export const getAccountingNodesDevices = createEvent();
