import { groupBy } from 'lodash';
import { HousingStockWithTasksResponse, TaskShortResponse } from 'myApi';
import { round } from 'utils/round';
import {
  GetPlacemarkerLayoutLinkResponse,
  HousingStockTaskMarkerType,
} from '../TasksMap/TasksMap.types';
import { getHousingStockTaskType } from '../TasksMap/TasksMap.utils';
import { TaskColorsDictionary } from './TasksMapsNative.constants';
import {
  DiagramConfig,
  DiagramData,
  SectorData,
} from './TasksMapsNative.types';

export const createDiagramPie = (
  chartData: DiagramData[],
  config: DiagramConfig,
  content: string,
) => {
  const offsetRatio = {
    top: 0.25,
    right: 0,
    left: 0.5,
    bottom: -0.25,
  };

  const radius = config.radius || 100;
  const strokeWidth = config.strokeWidth || 5;
  const fullRadius = radius + strokeWidth;

  // длина окружности
  const length = 2 * Math.PI * radius;

  // смещение начальной точки
  let startPoint = config.start in offsetRatio ? config.start : 'top';
  const chartOffset = length * offsetRatio[startPoint];

  // расчетные данные для построения секторов
  const sectors: SectorData[] = [];

  chartData.forEach((sectorData, sectorIndex) => {
    // Длина сектора
    const width = (length * sectorData.value) / 100;
    // Смещение сектора от начальной точки
    let offset = chartOffset;

    if (sectorIndex > 0) {
      let prevSector = sectors[sectorIndex - 1];
      offset = prevSector.offset - prevSector.width;
    }

    sectors.push({
      ...sectorData,
      width,
      offset,
    });
  });

  const sectorsSvgArray = sectors.map((sector) => {
    const circle = `
        <circle
            cx="${fullRadius}" 
            cy="${fullRadius}" 
            r="${radius}" 
            stroke-dasharray="${`${sector.width} ${length - sector.width}`}" 
            stroke-dashoffset="${sector.offset}"
            stroke-width="${strokeWidth}"
            stroke="${sector.color}"
        />
    `;

    return circle;
  });

  const substrate = `
        <circle
            cx="${fullRadius}" 
            cy="${fullRadius}" 
            r="${radius}"  
            fill="white"
        />
    `;

  const svgString = `
    <svg 
      width="${fullRadius * 2}" 
      height="${fullRadius * 2}" 
      viewBox="${`0 0 ${fullRadius * 2} ${fullRadius * 2}`}"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
        ${substrate}
        ${sectorsSvgArray.join(' ')}
        ${content}
    </svg>
  `;

  return svgString;
};

const getClusterText = (
  housingStocksWithTasksList: HousingStockWithTasksResponse[],
) => {
  const margin = 9;

  const tasksCount = housingStocksWithTasksList.reduce(
    (acc, elem) => acc + (elem.tasks?.length || 0),
    0,
  );

  const taskCountStringLength = String(tasksCount).length;

  const margins: { [key: number]: number } = {
    1: margin - 4,
    2: -2,
    3: -margin,
    4: -(2 * margin) + 2,
  };

  const taskCountSvgText = `
        <text 
            x="${40 + (margins[taskCountStringLength] || 0)}px" 
            y="62px"
            font-family="PTRootUIWeb"
            fill="#28305C"
            style="font: 26px sans-serif; font-weight: bold"
        >
            ${tasksCount}
        </text>  
    `;

  return taskCountSvgText;
};

const getDiagramDataByHousingStockTasks = (
  housingStocksWithTasksList: HousingStockWithTasksResponse[],
) => {
  const tasksFlatArray = housingStocksWithTasksList.reduce(
    (acc, elem) => [...acc, ...(elem.tasks || [])],
    [] as TaskShortResponse[],
  );

  const tasksGroups: { [key: string]: TaskShortResponse[] } = groupBy(
    tasksFlatArray,
    (elem) => getHousingStockTaskType(elem) || 'unknown',
  );

  const diargamData: DiagramData[] = Object.entries(tasksGroups).map(
    ([resource, tasks]) => ({
      value: round(tasks.length / tasksFlatArray.length, 6) * 100,
      color:
        TaskColorsDictionary[
          resource as unknown as HousingStockTaskMarkerType
        ] || '#28305C',
    }),
  );

  return diargamData;
};

export const getClusterIcon = (
  housingStocksWithTasksList: HousingStockWithTasksResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const taskCountSvgText = getClusterText(housingStocksWithTasksList);

  const svgCodeText = createDiagramPie(
    getDiagramDataByHousingStockTasks(housingStocksWithTasksList),
    {
      strokeWidth: 12,
      radius: 40,
      start: 'top',
    },
    taskCountSvgText,
  );

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return {
    iconHrev,
    size: {
      width: 52,
      height: 52,
    },
  };
};
