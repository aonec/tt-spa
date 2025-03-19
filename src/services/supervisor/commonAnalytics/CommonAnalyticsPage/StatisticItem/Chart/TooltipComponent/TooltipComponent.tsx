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
      return 'неисправностей';
    }
    if (currentDashboardType === DashboardDataType.PipeRupturesCount) {
      return 'порывов';
    }
    if (currentDashboardType === DashboardDataType.ResourceDisconnectsCount) {
      return 'отключений';
    }
    if (currentDashboardType === DashboardDataType.TasksCount) {
      return 'задач';
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
