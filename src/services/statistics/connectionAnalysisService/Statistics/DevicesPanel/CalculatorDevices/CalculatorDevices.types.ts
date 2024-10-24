import { EHousingMeteringDeviceType, EResourceType } from 'api/types';

export type Props = {
  device: {
    resource: string;
    housingMeteringDeviceType: EHousingMeteringDeviceType;
    id: number;
    model: string;
    serialNumber: string;
    isActive: boolean;
  };
  resource: EResourceType;
};
