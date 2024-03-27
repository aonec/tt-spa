import { groupBy, sortBy, uniq } from 'lodash';
import {
  HousingStockWithTasksResponse,
  TaskShortResponse,
  EActResourceType,
  EResourceType,
  ETaskTargetObject,
  EManagingFirmTaskType,
} from 'api/types';
import { round } from 'utils/round';
import {
  GetPlacemarkerLayoutLinkResponse,
  HousingStockTaskMarkerType,
} from './TasksMapsNative.types';
import {
  ApplicationTaskPlacemark,
  TaskColorsDictionary,
} from './TasksMapsNative.constants';
import {
  DiagramConfig,
  DiagramData,
  SectorData,
} from './TasksMapsNative.types';

import {
  CalculatorPlacemark,
  ExtenedTaskPanelBySizeDictionary,
  getCountCircle,
  ResourcesPlacemarksLookup,
  TaskTypePlacemarkIconsDictionary,
} from './TasksMapsNative.constants';

const getPlacemarkSvgCodeText = (tasks: TaskShortResponse[]) => {
  const allTasksResources = uniq(
    tasks.reduce(
      (acc, elem) => [...acc, ...(elem.resourceTypes || [])],
      [] as EResourceType[],
    ),
  );

  if (allTasksResources?.length) {
    const uniqTaskTypesCount = (allTasksResources?.length || 1) > 1;

    const type = uniqTaskTypesCount
      ? EActResourceType.All
      : allTasksResources?.[0];

    return ResourcesPlacemarksLookup[type];
  }

  const taskExample = tasks[0];

  if (taskExample.targetObject === ETaskTargetObject.Calculator) {
    return CalculatorPlacemark;
  }

  return ApplicationTaskPlacemark;
};

export const getTaskPlacemarkerLink = (
  tasks: TaskShortResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const count = tasks.length;

  const textPosition = String(count).length === 1 ? 25.5 : 23;
  const difference = String(count).length - 2;
  const width = difference <= 0 ? 16 : 19 + difference * 3.7;

  const placemarkSvgCodeText = getPlacemarkSvgCodeText(tasks);

  const svgCodeText = `
            <svg width="36" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${placemarkSvgCodeText}
              ${
                (count || 0) > 1 &&
                `<rect x="20" y='2' width="${width}" height="16" rx="8" ry='8' fill='rgba(39, 47, 90)' stroke='white' strokeWidth='1' />
                   <text x="${textPosition}px" y="13px" font-family="PTRootUIWeb" fill="white" style="font: 9px sans-serif;">${count}</text>      
                `
              }
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

const applicationTypes = [
  // EManagingFirmTaskType.PlannedApplication,
  EManagingFirmTaskType.CurrentApplication,
  EManagingFirmTaskType.EmergencyApplication,
];

export const getHousingStockTaskType = (
  task: TaskShortResponse,
): HousingStockTaskMarkerType | null => {
  if (applicationTypes.includes(task.type))
    return HousingStockTaskMarkerType.Application;

  if (task.targetObject === ETaskTargetObject.Calculator)
    return HousingStockTaskMarkerType.Calculator;

  const resources = uniq(task.resourceTypes || []);

  if (resources.length > 1) return HousingStockTaskMarkerType.AllResources;

  const taskResource = resources[0];

  if (!taskResource) return null;

  switch (taskResource) {
    case EResourceType.ColdWaterSupply:
      return HousingStockTaskMarkerType.ColdWaterSupply;
    case EResourceType.HotWaterSupply:
      return HousingStockTaskMarkerType.HotWaterSupply;
    case EResourceType.Heat:
      return HousingStockTaskMarkerType.Heat;
    case EResourceType.Electricity:
      return HousingStockTaskMarkerType.Electricity;
    default:
      return HousingStockTaskMarkerType.AllResources;
  }
};

export const groupTasksByMarkerType = (tasks: TaskShortResponse[]) => {
  return groupBy(tasks, (task) => getHousingStockTaskType(task));
};

export const getExtendedMapMarkerlayoutLink = (
  tasks: TaskShortResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const tasksTypeGroups = groupTasksByMarkerType(tasks);

  const typesCount = Object.keys(tasksTypeGroups).length;

  const panelLayout = ExtenedTaskPanelBySizeDictionary[typesCount];

  if (!panelLayout) return getTaskPlacemarkerLink(tasks);

  const taskTypesIcons = Object.entries(tasksTypeGroups)
    .map(([type, tasks], index) => {
      const calculateIcon =
        TaskTypePlacemarkIconsDictionary[type] ||
        TaskTypePlacemarkIconsDictionary.AllResources;

      const x = (index + 1) * 31 - 8;

      return `${calculateIcon(x, 20)} ${getCountCircle(x + 3, tasks.length)}`;
    })
    .join(' ');

  const svgCodeText = `
      <svg width="${panelLayout.width}px" preserveAspectRatio="xMidYMid meet" height="65px" viewBox="0 0 300px 65px" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${panelLayout.layout}
        ${taskTypesIcons}
      </svg>
    `;

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return {
    iconHrev,
    size: { width: panelLayout.width, height: 65 },
    isExtended: true,
  };
};

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
            fill="#ffffffb6"
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

  const diargamData: DiagramData[] = sortBy(
    Object.entries(tasksGroups),
    ([key]) => key,
  ).map(([resource, tasks]) => ({
    value: round(tasks.length / tasksFlatArray.length, 6) * 100,
    color:
      TaskColorsDictionary[resource as unknown as HousingStockTaskMarkerType] ||
      '#28305C',
  }));

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
