import { EMagistralType } from '../../myApi';

export interface ItemInterface {
  id: number;
  value: number;
  model: string;
  label: string;
}

export type SelectItem = ItemInterface;

export const resources = [
  {
    value: 'HotWaterSupply',
    label: 'Горячая вода',
  },
  {
    value: 'ColdWaterSupply',
    label: 'Холодная вода',
  },
  {
    value: 'Heat',
    label: 'Отопление',
  },
];

export const allResources = [
  {
    value: 'ColdWaterSupply',
    label: 'ХВС',
  },
  {
    value: 'HotWaterSupply',
    label: 'ГВС',
  },
  {
    value: 'Heat',
    label: 'Тепло',
  },
  {
    value: 'Electricity',
    label: 'Электроэнергия',
  },
];

interface MagistralsInterface {
  value: EMagistralType;
  label: string;
}

export const magistrals: Array<MagistralsInterface> = [
  {
    value: EMagistralType.FeedFlow,
    label: 'Подающая',
  },
  {
    value: EMagistralType.FeedBackFlow,
    label: 'Обратная',
  },
  {
    value: EMagistralType.Recharge,
    label: 'Подпитка',
  },
];

export const ipv4RegExp =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
