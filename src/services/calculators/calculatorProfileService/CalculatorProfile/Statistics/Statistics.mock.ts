import { EHousingMeteringDeviceType } from 'api/types';

export const mockDevices = [
  {
    resource: 'HotWaterSupply',
    housingMeteringDeviceType: EHousingMeteringDeviceType.FlowMeter,
    id: 2542765,
    model: 'ПРЭМ',
    serialNumber: '231258',
    isActive: true,
  },
  {
    resource: 'HotWaterSupply',
    housingMeteringDeviceType: EHousingMeteringDeviceType.TemperatureSensor,
    id: 2542771,
    model: 'КТСБ',
    serialNumber: '186321',
    isActive: false,
  },
];
