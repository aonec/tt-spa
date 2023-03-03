import _ from 'lodash';
import {
  EActResourceType,
  EResourceType,
  HousingStockWithTasksResponse,
  MeteringDeviceSearchListResponse,
} from 'myApi';
import {
  CalculatorPlacemark,
  ResourcesPlacemarksLookup,
} from './TasksMapView.constants';
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

export const getTaskPlacemarkerLink = (
  housingStockWithTask: HousingStockWithTasksResponse,
) => {
  const textPosition =
    String(housingStockWithTask.tasks?.length).length === 2 ? 24.5 : 27.3;

  const allTasksResources = housingStockWithTask.tasks?.reduce(
    (acc, elem) => [...acc, ...(elem.resourceTypes || [])],
    [] as EResourceType[],
  );

  const placemarkSvgCodeText = allTasksResources?.length
    ? ResourcesPlacemarksLookup[
        (allTasksResources?.length || 1) > 1
          ? EActResourceType.All
          : allTasksResources?.[0]
      ]
    : CalculatorPlacemark;

  const svgCodeText = `
            <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${placemarkSvgCodeText}
              ${
                (housingStockWithTask.tasks?.length || 0) > 1 &&
                `<path d="M22.3147 8.5C22.3147 4.35786 25.6726 1 29.8147 1V1C33.9569 1 37.3147 4.35786 37.3147 8.5V8.5C37.3147 12.6421 33.9569 16 29.8147 16V16C25.6726 16 22.3147 12.6421 22.3147 8.5V8.5Z" fill="#272F5A" stroke="white"/>
                   <text x="${textPosition}px" y="11.4px" font-family="PTRootUIWeb" fill="white" style="font: 9px sans-serif;">${housingStockWithTask.tasks?.length}</text>      
                `
              }
            </svg>`;

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return iconHrev;
};
