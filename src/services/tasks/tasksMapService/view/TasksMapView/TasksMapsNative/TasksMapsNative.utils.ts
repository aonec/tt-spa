import { HousingStockWithTasksResponse } from 'myApi';
import { GetPlacemarkerLayoutLinkResponse } from '../TasksMap/TasksMap.types';
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

export const getClusterIcon = (
  housingStocksWithTasksList: HousingStockWithTasksResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const margin = 9;

  const tasksCount = housingStocksWithTasksList.reduce(
    (acc, elem) => acc + (elem.tasks?.length || 0),
    0,
  );

  const taskCountStringLength = String(tasksCount).length;

  const margins: { [key: number]: number } = {
    1: margin,
    2: 0,
    3: -margin,
    4: -(2 * margin),
  };

  const taskCountSvgText = `
        <text 
            x="${40 + (margins[taskCountStringLength] || 0)}px" 
            y="62px"
            font-family="PTRootUIWeb"
            fill="#28305C"
            style="font: 26px sans-serif;"
        >
            ${tasksCount}
        </text>  
    `;

  const svgCodeText = createDiagramPie(
    [
      {
        value: 30,
        color: '#79AFFF',
      },
      {
        value: 20,
        color: '#FF8C68',
      },
      {
        value: 15,
        color: '#E2B104',
      },
      {
        value: 35,
        color: '#28305C',
      },
    ],
    {
      strokeWidth: 12,
      radius: 40,
      start: 'top',
    },
    taskCountSvgText,
  );

  console.log(svgCodeText);

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return {
    iconHrev,
    size: {
      width: 52,
      height: 52,
    },
  };
};
