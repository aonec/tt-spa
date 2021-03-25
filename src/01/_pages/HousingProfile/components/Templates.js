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

export const template = {
  successResponse: {
    diameter: null,
    resource: 'ColdWaterSupply',
    housingMeteringDeviceType: 'FlowMeter',
    address: {
      id: 175,
      city: 'Нижнекамск',
      street: 'Тихая Аллея',
      housingStockNumber: '4',
      corpus: null,
    },
    hubConnection: {
      hub: {
        entryNumber: 11,
        hubNumber: 22,
        pipeNumber: 33,
        magistral: 'FeedFlow',
      },
      calculatorId: 1567711,
      calculatorSerialNumber: '291020201726',
      calculatorModel: null,
      calculatorConnection: {
        isConnected: true,
        ipV4: '192.168.1.100',
        port: 1234,
        deviceAddress: 24,
      },
    },
    id: 1567721,
    transactionType: null,
    model: 'COLD 1800',
    serialNumber: '291020201804',
    lastCommercialAccountingDate: '2020-10-29T15:00:22.31',
    futureCommercialAccountingDate: '2020-10-29T15:00:22.31',
    lastCheckingDate: '2020-10-29T15:04:52.697',
    futureCheckingDate: '2020-10-29T15:04:52.697',
    closingDate: null,
  },
};
