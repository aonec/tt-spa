import { HousingStockWithTasksResponse } from 'myApi';
import { GetPlacemarkerLayoutLinkResponse } from '../TasksMap/TasksMap.types';

export const getClusterIcon = (
  housingStocksWithTasksList: HousingStockWithTasksResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const margin = 5;

  const tasksCount = housingStocksWithTasksList.reduce(
    (acc, elem) => acc + (elem.tasks?.length || 0),
    0,
  );

  const taskCountStringLength = String(tasksCount).length;

  const margins: { [key: number]: number } = {
    1: margin,
    2: 0,
    3: -margin,
  };

  const svgCodeText = `
  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.50018" y="1.18774" width="38" height="38" rx="19" fill="#28305C" stroke="white" stroke-width="2"/>
        <text x="${
          12 + (margins[taskCountStringLength] || 0)
        }px" y="25px" font-family="PTRootUIWeb" fill="white" style="font: 16px sans-serif;">${tasksCount}</text>  
    </svg>

`;

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return {
    iconHrev,
    size: {
      width: 52,
      height: 52,
    },
  };
};
