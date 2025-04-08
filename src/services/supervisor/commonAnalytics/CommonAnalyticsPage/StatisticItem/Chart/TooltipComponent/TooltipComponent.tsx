import { FC, useMemo } from 'react';
import { Props } from './TooltipComponent.types';
import {
  DetailsBlock,
  Pointer,
  Quantity,
  TooltipBlock,
} from './TooltipComponent.styled';
import { DetailItem } from './DetailItem';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';
import { getCountText } from 'utils/getCountText';
import {
  malfunctionsDictionary,
  pipeRupturesDictionary,
  resourceDisconnectsDictionary,
  tasksCountDictionary,
} from './TooltipComponent.constants';

export const TooltipComponent: FC<Props> = ({
  x,
  y,
  datum,
  currentDashboardType,
}) => {
  const value = datum?.value || 0;

  const details = datum?.details || [];

  const title = useMemo(() => {
    if (currentDashboardType === DashboardDataType.AverageCompletionTime) {
      return 'время выполнения';
    }
    if (currentDashboardType === DashboardDataType.MalfunctionsCount) {
      return getCountText(datum?.label || 0, malfunctionsDictionary);
    }
    if (currentDashboardType === DashboardDataType.PipeRupturesCount) {
      return getCountText(datum?.label || 0, pipeRupturesDictionary);
    }
    if (currentDashboardType === DashboardDataType.ResourceDisconnectsCount) {
      return getCountText(datum?.label || 0, resourceDisconnectsDictionary);
    }
    if (currentDashboardType === DashboardDataType.TasksCount) {
      return getCountText(datum?.label || 0, tasksCountDictionary);
    }
  }, [currentDashboardType]);

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject
        x={x}
        y={y}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <TooltipBlock value={value}>
          <Quantity>
            {datum?.label} {title}
          </Quantity>
          <DetailsBlock>
            {details.map((detail, index) => (
              <DetailItem detail={detail} key={index} />
            ))}
          </DetailsBlock>
          <Pointer value={value} />
        </TooltipBlock>
      </foreignObject>
    </g>
  );
};
