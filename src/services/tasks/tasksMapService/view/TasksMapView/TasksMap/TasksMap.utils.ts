import { groupBy, uniq } from 'lodash';
import {
  EActResourceType,
  EResourceType,
  ETaskTargetObject,
  TaskShortResponse,
} from 'myApi';
import {
  CalculatorPlacemark,
  ExtenedTaskPanelBySizeDictionary,
  getCountCircle,
  ResourcesPlacemarksLookup,
  TaskTypePlacemarkIconsDictionary,
} from './TaskMap.constants';
import {
  GetPlacemarkerLayoutLinkResponse,
  HousingStockTaskMarkerType,
} from './TasksMap.types';

export const getTaskPlacemarkerLink = (
  tasks: TaskShortResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const textPosition = String(tasks.length).length === 2 ? 24.5 : 27.3;

  const allTasksResources = uniq(
    tasks.reduce(
      (acc, elem) => [...acc, ...(elem.resourceTypes || [])],
      [] as EResourceType[],
    ),
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
                (tasks?.length || 0) > 1 &&
                `<path d="M22.3147 8.5C22.3147 4.35786 25.6726 1 29.8147 1V1C33.9569 1 37.3147 4.35786 37.3147 8.5V8.5C37.3147 12.6421 33.9569 16 29.8147 16V16C25.6726 16 22.3147 12.6421 22.3147 8.5V8.5Z" fill="#272F5A" stroke="white"/>
                   <text x="${textPosition}px" y="11.4px" font-family="PTRootUIWeb" fill="white" style="font: 9px sans-serif;">${tasks.length}</text>      
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

export const getHousingStockTaskType = (
  task: TaskShortResponse,
): HousingStockTaskMarkerType | null => {
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
