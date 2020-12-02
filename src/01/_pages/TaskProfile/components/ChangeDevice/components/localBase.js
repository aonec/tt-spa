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
      'calculatorId'
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
      'calculatorId']
  }

}

export const selectedTemplate = {
  serialNumber: '',
  model: '',
  lastCommercialAccountingDate: null,
  futureCommercialAccountingDate: null,
  lastCheckingDate: null,
  futureCheckingDate: null,
};
