export const items = [
  {
    value: '1',
    label: 'ТЭМ-106',
    id: 1,
    parent: 'infoId',
  },
  {
    value: '2',
    label: 'ТЭМ-104',
    id: 2,
    parent: 'infoId',
  },
  {
    value: '3',
    label: 'ТЭМ-104',
    id: 3,
    parent: 'infoId',
  },
  {
    value: '4',
    label: 'ВКТ-7',
    id: 4,
    parent: 'infoId',
  },
  {
    value: '5',
    label: 'ВИСТ',
    id: 5,
    parent: 'infoId',
  },
];

export const serviceLife = [
  { value: '4', label: '4 года', id: 1 },
  { value: '6', label: '6 лет', id: 2 },
];

export const types = [
  {
    value: 'FlowMeter',
    label: 'Расходомер',
  },
  {
    value: 'TemperatureSensor',
    label: 'Термодатчик',
  },
];

export const resources = [
  {
    value: 'HotWaterSupply',
    label: 'Горячая вода',
    id: 1,
    parent: 'resource',
  },
  {
    value: 'ColdWaterSupply',
    label: 'Холодная вода',
    id: 2,
    parent: 'resource',
  },
  {
    value: 'Heat',
    label: 'Отопление',
    id: 3,
    parent: 'resource',
  },
];

export const magistrals = [
  {
    value: 'FeedFlow',
    label: 'Подающая',
    id: 1,
    parent: 'magistral',
  },
  {
    value: 'FeedBackFlow',
    label: 'Обратная',
    id: 2,
    parent: 'magistral',
  },
];
