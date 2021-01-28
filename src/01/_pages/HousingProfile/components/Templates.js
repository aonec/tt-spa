export const DEFAULT_BUILDING = {
  city: null,
  street: null,
  housingStockNumber: null,
};

export const DEFAULT_DEVICE = {
  model: null,
  serialNumber: null,
  resource: null,
  commercialAccountingDate: null,
  futureCheckingDate: null,
  lastCheckingDate: null,
  hubConnection: {
    hub: {
      entryNumber: null,
      hubNumber: null,
      pipeNumber: null,
      magistral: '',
    },
  },
};

export const DEFAULT_ICON = {
  icon: 'device',
  color: 'initial',
};

export const periodList = [
  { label: 'Месячный', value: 'month' },
  { label: 'Суточный', value: 'day' },
  { label: 'Годовой', value: 'year' },
];

export const detailList = [
  { label: 'Суточный', value: 'daily' },
  { label: 'Часовой', value: 'hourly' },
];

export const typelList = [
  { label: 'Холодная вода', value: 'coldwatersupply' },
  { label: 'Горячая вода', value: 'heat' },
];

export const FeedFlowList = [
  { label: 'Подающая', value: 'FeedFlow' },
  { label: 'Обратная', value: 'FeedBackFlow' },
]