export const items = [
  {
    id: 1,
    model: 'ТЭМ-106',
  },
  {
    id: 2,
    model: 'ТЭМ-104',
  },
  {
    id: 3,
    model: 'ВКТ-7',
  },
  {
    id: 4,
    model: 'ТВ-7',
  },
  {
    id: 5,
    model: 'ВИСТ',
  },
];

export const serviceLife = [
  { value: '4', label: '4 года', id: 1 },
  { value: '6', label: '6 лет', id: 2 },
];

export const housingMeteringDeviceTypes = [
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

export const magistrals = [
  {
    value: 'FeedFlow',
    label: 'Подающая',
  },
  {
    value: 'FeedBackFlow',
    label: 'Обратная',
  },
];

export const connections = [
  {
    value: true,
    label: 'Есть',
  },
  {
    value: false,
    label: 'Отсутствует',
  },
];

export const OPDU_PUT_TEMPLATE = {
  serialNumber: 'string',
  checkingDate: '2020-10-19T11:19:54.947Z',
  futureCheckingDate: '2020-10-19T11:19:54.947Z',
  lastCommercialAccountingDate: '2020-10-19T11:19:54.947Z',
  futureCommercialAccountingDate: '2020-10-19T11:19:54.947Z',
  connection: {
    ipV4: 'string',
    deviceAddress: 0,
    port: 0,
  },
  calculatorId: 0,
  housingMeteringDeviceType: 'string',
  resource: 'string',
  model: 'string',
  pipe: {
    entryNumber: 0,
    hubNumber: 0,
    pipeNumber: 0,
    magistral: 'string',
  },
};
