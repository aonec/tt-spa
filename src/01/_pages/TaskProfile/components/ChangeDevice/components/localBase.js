import * as Yup from 'yup';

export const calculatorChangeValidationSchema = {
  resource: Yup.string().required('Введите данные'),
  pipeNumber: Yup.number().required('Введите число от 0'),
  entryNumber: Yup.number().min(0, 'от 0').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
  model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите данные'),
  serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите данные'),
  calculatorId: Yup.string().required('Выберите вычислитель'),
};

export const actionsList = [
  { value: 1, label: 'Замена прибора' },
];

export const executorsList = [
  { value: 1, label: 'Константинопольский К.К.' },
];

export const tabs = [
  {
    title: 'Шаг 1. Общие данные',
    key: '1',
  },
  {
    title: 'Шаг 2. Настройки соединения',
    key: '2',
  },
  {
    title: 'Шаг 3. Документы',
    key: '3',
  },
];

export const disabledValuesByType = {
  Calculator: {
    empty: [
      'infoId',
      'ipV4',
      'port',
      'deviceAddress',
      'serialNumber',
      'lastCheckingDate',
      'futureCheckingDate',
      'lastCommercialAccountingDate',
      'futureCommercialAccountingDate',
      'housingMeteringDeviceType',
      'resource',
      'model',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
    edit: [
      'infoId',
      'ipV4',
      'port',
      'deviceAddress',
      'serialNumber',
      'resource',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId',
    ],
    add: [
      'ipV4',
      'port',
      'deviceAddress',
      'housingMeteringDeviceType',
      'resource',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
  },
  ThermoSensor: {
    empty: ['serialNumber',
      'lastCheckingDate',
      'futureCheckingDate',
      'lastCommercialAccountingDate',
      'futureCommercialAccountingDate',
      'housingMeteringDeviceType',
      'resource',
      'model',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
    edit: ['serialNumber',
      'housingMeteringDeviceType',
      'resource',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
    add: [
      'housingMeteringDeviceType',
      'resource',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
  },

  FlowMeter: {
    empty: ['serialNumber',
      'lastCheckingDate',
      'futureCheckingDate',
      'lastCommercialAccountingDate',
      'futureCommercialAccountingDate',
      'housingMeteringDeviceType',
      'resource',
      'model',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
    edit: ['serialNumber',
      'housingMeteringDeviceType',
      'resource',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
    add: [
      'housingMeteringDeviceType',
      'resource',
      'isConnected',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'calculatorId'],
  },

};

export const selectedTemplate = {
  serialNumber: '',
  model: '',
  lastCommercialAccountingDate: null,
  futureCommercialAccountingDate: null,
  lastCheckingDate: null,
  futureCheckingDate: null,
};

export const calculatorTemplate = {
  connection: {
    isConnected: false,
    ipV4: '',
    port: null,
    deviceAddress: null,
  },
  isConnected: false,
  serialNumber: '',
  model: '',
  lastCommercialAccountingDate: null,
  futureCommercialAccountingDate: null,
  lastCheckingDate: null,
  futureCheckingDate: null,
};
