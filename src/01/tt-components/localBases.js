export const items = [
  {
    id: 1,
    value: 1,
    model: 'ТЭМ-106',
    label: 'ТЭМ-106',
  },
  {
    id: 2,
    value: 2,
    model: 'ТЭМ-104',
    label: 'ТЭМ-104',
  },
  {
    id: 3,
    value: 3,
    model: 'ВКТ-7',
    label: 'ВКТ-7',
  },
  {
    id: 4,
    value: 4,
    model: 'ТВ-7',
    label: 'ТВ-7',
  },
  {
    id: 5,
    value: 5,
    model: 'ВИСТ',
    label: 'ВИСТ',
  }, {
    id: 10,
    value: 10,
    model: 'Sonosafe',
    label: 'Sonosafe',
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

export const isConnected = [
  {
    value: true,
    label: 'Есть',
  },
  {
    value: false,
    label: 'Отсутствует',
  },
];

export const isConnectedValue = [
  {
    value: true,
    label: 'Есть',
  },
  {
    value: false,
    label: 'Отсутствует',
  },
];

export const timeZones = [
  { value: 1, item: '01:00:00', label: 'UTC+1' },
  { value: 2, item: '02:00:00', label: 'UTC+2' },
  { value: 3, item: '03:00:00', label: 'UTC+3' },
  { value: 4, item: '04:00:00', label: 'UTC+4' },
];

export const UserRoles = [
  {
    value: 760,
    label: 'Администратор УК',
  },
  {
    value: 1309829,
    label: 'Оператор УК',
  },
  // {
  //   value: 756,
  //   label: '4',
  // },
  {
    value: 758,
    label: 'Собственник квартиры',
  },
  {
    value: 1310772,
    label: 'Администратор системы',
  },
  {
    value: 757,
    label: 'Сервис Scada',
  },
  {
    value: 761,
    label: 'Сервис ЕРЦ',
  },
  {
    value: 1503658,
    label: 'Фоновый рабочий',
  },
  {
    value: 759,
    label: 'Исполнитель УК',
  },

];

export const DEFAULT_BUILDING = {
  city: null,
  street: null,
  housingStockNumber: null,
};

export const DEFAULT_DEVICE = {
  model: null,
  diameter: null,
  serialNumber: null,
  resource: null,
  commercialAccountingDate: null,
  futureCheckingDate: null,
  lastCheckingDate: null,
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

export const nodeStatusList = [
  {
    value: 'Registered',
    label: 'Сдан на коммерческий учет',
  },
  {
    value: 'NotRegistered',
    label: 'Не на коммерческом учете',
  },
  {
    value: 'OnReview',
    label: 'На утверждении',
  },
  {
    value: 'Prepared',
    label: 'Подготовлен к сдаче',
  },
];

export const serviceZoneList = [
  {
    value: 'Apartments',
    label: 'Апартаменты',
  },
  {
    value: 'CommercialPremises',
    label: 'Коммерческие помещения'
  }
];

export const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

export const ipv4RegExp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const numberRegExp = /^[0-9][A-Za-z0-9 -]*$/;
