interface ForbiddenUrl {
  methods: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH')[];
  regExp: RegExp;
}

export const forbiddenList: ForbiddenUrl[] = [
  {
    methods: ['POST', 'PUT', 'DELETE'],
    regExp: /^Calculators\/\d+\/comment$/,
  },
  {
    methods: ['PATCH'],
    regExp: /^Apartments\/\d+\/SetStatus$/,
  },
  {
    methods: ['POST'],
    regExp: /^IndividualDevices\/\d+\/check$/,
  },
  {
    methods: ['POST'],
    regExp: /^IndividualDeviceReadings\/createLite$/,
  },
  {
    methods: ['PATCH'],
    regExp: /^HousingStocks\/\d+\/inspector$/,
  },
  {
    methods: ['POST'],
    regExp: /^HomeownerAccounts\/Close$/,
  },
  {
    methods: ['POST'],
    regExp: /^HomeownerAccounts$/,
  },
  {
    methods: ['PUT'],
    regExp: /^HomeownerAccounts\/\d+$/,
  },
  {
    methods: ['POST'],
    regExp: /^MeteringDevices\/check$/,
  },
  {
    methods: ['POST'],
    regExp: /^MeteringDevices\/close$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/Report$/,
  },
  {
    methods: ['PUT'],
    regExp: /^Calculators\/\d+$/,
  },
  {
    methods: ['GET'],
    regExp: /^Devices\/Individual\/House$/,
  },
  {
    methods: ['PUT'],
    regExp: /^ElectricHousingMeteringDevices\/\d+$/,
  },
  {
    methods: ['POST'],
    regExp: /^MeteringDevices\/check$/,
  },
  {
    methods: ['POST'],
    regExp: /^MeteringDevices\/close$/,
  },
  {
    methods: ['PUT'],
    regExp: /^PipeHousingMeteringDevices\/\d+$/,
  },
  {
    methods: ['GET'],
    regExp: /^PipeHousingMeteringDevices\/\d+$/,
  },
  {
    methods: ['POST'],
    regExp: /^ElectricHousingMeteringDevices\/switch$/,
  },
  {
    methods: ['GET', 'PUT'],
    regExp: /^Apartments\/\d+$/,
  },
  {
    methods: ['POST'],
    regExp: /^PipeNodes\/\d+\/SetCommercialStatus$/,
  },
  {
    methods: ['POST'],
    regExp: /^PipeNodes\/\d+\/SetRegistrationType$/,
  },
  {
    methods: ['POST'],
    regExp: /^PipeNodes$/,
  },
  {
    methods: ['POST'],
    regExp: /^NodeServiceZones$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/FeedBackFlowTemperatureReport$/,
  },
  {
    methods: ['POST'],
    regExp: /^HousingStocks$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/GroupReport$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/SoiReport$/,
  },
  {
    methods: ['GET'],
    regExp: /^HousingStocks\/\d+\/Calculators$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/ApartmentActsReportXlsx$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/EmployeeReportXlsx$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/HomeownersReportXlsx$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/HousingDevicesReportXlsx$/,
  },
  {
    methods: ['GET'],
    regExp: /^Reports\/IndividualDevicesReportXlsx$/,
  },
  {
    methods: ['POST'],
    regExp: /^ResourceDisconnecting\/\d+\/Complete$/,
  },
  {
    methods: ['POST'],
    regExp: /^ResourceDisconnecting$/,
  },
  {
    methods: ['DELETE'],
    regExp: /^ResourceDisconnecting\/\d+$/,
  },
  {
    methods: ['DELETE', 'POST'],
    regExp: /^ResourceDisconnecting\/\d+$/,
  },
  {
    methods: ['GET'],
    regExp: /^PipeNodes\/DataForHousingConsumptionPlot$/,
  },
  {
    methods: ['GET'],
    regExp:
      /^IndividualDeviceReadings\/DataForSubscriberAndNormativeConsumptionPlot$/,
  },
  {
    methods: ['GET'],
    regExp: /^ResourceDisconnecting\/Filters$/,
  },
];
