import { HousingStockWithTasksResponse } from 'myApi';
import { GetPlacemarkerLayoutLinkResponse } from '../TasksMap/TasksMap.types';

export const getClusterIcon = (
  housingStockWithTasks: HousingStockWithTasksResponse,
): GetPlacemarkerLayoutLinkResponse => {
  const svgCodeText = `
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        
    </svg>`;

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return {
    iconHrev,
    size: {
      width: 52,
      height: 52,
    },
  };
};
