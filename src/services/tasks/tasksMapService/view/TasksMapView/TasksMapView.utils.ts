import _ from 'lodash';
import { EActResourceType, MeteringDeviceSearchListResponse } from 'myApi';
import { ResourcesPlacemarksLookup } from './TasksMapView.constants';
import calculatorPlacemark from './assets/calculatorPlacemark.svg';

export const getTaskIcon = (
  devices: MeteringDeviceSearchListResponse[] | null,
) => {
  if (!devices) {
    return null;
  }

  const device = devices[0];

  const allDevicesResource = devices.map((device) => device?.resource);
  const isUniq = _.uniq(allDevicesResource).length === 1;
  const iconType = isUniq ? device?.resource : EActResourceType.All;

  if (iconType) {
    return ResourcesPlacemarksLookup[iconType];
  }

  return calculatorPlacemark;
};
