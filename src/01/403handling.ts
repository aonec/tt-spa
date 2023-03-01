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
];
