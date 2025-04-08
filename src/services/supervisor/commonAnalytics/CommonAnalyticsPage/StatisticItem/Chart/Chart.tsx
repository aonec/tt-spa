import { FC, useMemo } from 'react';
import { horizontalAxisStyle, verticalAxisStyle } from './Chart.styled';
import { Props } from './Chart.types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import { TickComponent } from 'ui-kit/shared/GraphComponents/TickComponent';
import { getMax } from './Chart.utils';
import { TooltipComponent } from './TooltipComponent';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';

export const Chart: FC<Props> = ({ chart, type, currentDashboardType }) => {
  const mock = [{ x: ' ', y: 0 }];

  const maxY = useMemo(() => {
    return getMax(chart);
  }, [chart]);

  return (
    <VictoryChart
      domainPadding={{ x: 40 }}
      theme={VictoryTheme.material}
      width={600}
      height={300}
      style={{
        parent: {
          overflow: 'visible',
        },
      }}
      domain={maxY ? { y: [0, maxY] } : undefined}
    >
      <VictoryAxis
        style={horizontalAxisStyle}
        tickComponent={<TickComponent />}
        tickFormat={(x: string, index: number, ticks: string[]) => {
          if (type === EDateRange.Month) {
            if (index === 0 || index % 5 === 0 || ticks.length - 1 === index) {
              return x;
            } else {
              return '';
            }
          }
          return x;
        }}
      />
      <VictoryAxis
        dependentAxis
        style={verticalAxisStyle}
        tickFormat={(tick) => {
          if (tick % 1 === 0) {
            return tick;
          }
        }}
      />

      <VictoryBar
        style={{ data: { fill: 'rgba(24, 158, 233, 1)' } }}
        data={chart || mock}
        barWidth={
          type === EDateRange.Week ? 55 : type === EDateRange.Month ? 12 : 100
        }
        cornerRadius={2}
        labelComponent={
          <VictoryTooltip
            style={{ fill: 'none' }}
            flyoutComponent={
              <TooltipComponent currentDashboardType={currentDashboardType} />
            }
          />
        }
      />
    </VictoryChart>
  );
};
