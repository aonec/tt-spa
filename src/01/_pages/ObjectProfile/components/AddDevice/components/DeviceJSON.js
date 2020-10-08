export   const items = [
  {
      "id": 1,
      "model": "ТЭМ-106"
  },
  {
      "id": 2,
      "model": "ТЭМ-104"
  },
  {
      "id": 3,
      "model": "ВКТ-7"
  },
  {
      "id": 4,
      "model": "ТВ-7"
  },
  {
      "id": 5,
      "model": "ВИСТ"
  }
]

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
