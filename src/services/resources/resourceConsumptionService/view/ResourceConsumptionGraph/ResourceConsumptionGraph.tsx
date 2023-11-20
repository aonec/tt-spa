import React, { FC, useEffect, useMemo, useState } from 'react';
import { GraphEmptyData } from 'services/nodes/displayNodesStatisticsService/view/GraphEmptyData';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import {
  ResourceConsumptionGraphDataType,
  ResourceConsumptionGraphType,
} from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraphColorsMeasure } from './ResourceConsumptionGraph.constants';
import {
  getCurrentDataStyle,
  Wrapper,
} from './ResourceConsumptionGraph.styled';
import { ResourceConsumptionGraphProps } from './ResourceConsumptionGraph.types';
import { getGraphTypeColors } from './ResourceConsumptionGraph.utils';
import { ResourceConsumptionGraphTooltip } from './ResourceConsumptionGraphTooltip';
import { GraphGradient } from 'ui-kit/shared/GraphComponents/GraphGradient';
import { TickComponent } from 'ui-kit/shared/GraphComponents/TickComponent';
import {
  horizontalAxisStyle,
  verticalAxisStyle,
} from 'services/nodes/displayNodesStatisticsService/view/StatisticsGraph/StatisticsGraph.styled';
import { CustomTooltip } from 'ui-kit/shared/GraphComponents/CustomTooltip';
import { useUnit } from 'effector-react';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

const height = 360;

export const ResourceConsumptionGraph: FC<ResourceConsumptionGraphProps> = ({
  consumptionData,
  resource,
  startOfMonth,
  checked,
  selectedAddresses,
  dynamicMinMax,
}) => {
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });
  const [width, setWidth] = useState(0);

  const additionalAddressConsumptionData =
    consumptionData?.additionalAddress || null;

  const lines = useMemo(() => {
    return Object.values(ResourceConsumptionGraphDataType).map((typeOfData) => {
      const isAdditionalAddress =
        (additionalAddressConsumptionData &&
          typeOfData === ResourceConsumptionGraphDataType.prevMonthData) ||
        !selectedAddresses.additionalAddress;

      const hideCurrentMonthData =
        typeOfData === ResourceConsumptionGraphDataType.currentMonthData &&
        !selectedAddresses.currentAddress;

      if (
        !consumptionData ||
        !resource ||
        // isAdditionalAddress ||разобраться с доп адресами в следующей задаче
        hideCurrentMonthData
      ) {
        return null;
      }

      const monthData = consumptionData[typeOfData];

      const typeOfChecked =
        typeOfData === ResourceConsumptionGraphDataType.additionalAddress
          ? ResourceConsumptionGraphDataType.currentMonthData
          : typeOfData;

      const isLineChecked = !isAdditionalAddress
        ? checked[typeOfChecked]
        : selectedAddresses.currentAddress
        ? checked[typeOfChecked]
        : checked[typeOfChecked];

      if (!monthData) {
        return null;
      }

      return Object.entries(monthData).map(([key, data]) => {
        const isCurrentMonthHousingData =
          typeOfData === ResourceConsumptionGraphDataType.currentMonthData &&
          key === ResourceConsumptionGraphType.Housing;

        if (
          isLineChecked[key as ResourceConsumptionGraphType] &&
          !isCurrentMonthHousingData
        ) {
          return (
            <VictoryLine
              key={key}
              data={data}
              interpolation="monotoneX"
              x="key"
              y="value"
              style={{
                data: {
                  stroke: getGraphTypeColors({
                    resource,
                    type: key as ResourceConsumptionGraphType,
                    isOpacityNeed:
                      typeOfData !==
                      ResourceConsumptionGraphDataType.currentMonthData,
                  }),
                  strokeWidth: 2,
                },
              }}
            />
          );
        }
        return null;
      });
    });
  }, [
    consumptionData,
    resource,
    checked,
    selectedAddresses,
    additionalAddressConsumptionData,
  ]);

  useEffect(() => {
    const wrapperNode = document.getElementById('graphWrapper');

    const handleResize = () => setWidth(wrapperNode?.clientWidth || 0);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isConsumptionDataItemsEmpty = useMemo(
    () =>
      [
        consumptionData.currentMonthData?.housing?.length === 0,
        consumptionData.currentMonthData?.normative?.length === 0,
        consumptionData.currentMonthData?.subscriber?.length === 0,
        consumptionData.prevMonthData?.housing?.length === 0,
        consumptionData.prevMonthData?.normative?.length === 0,
        consumptionData.prevMonthData?.subscriber?.length === 0,
      ].every(Boolean),
    [consumptionData],
  );

  if (!resource || !consumptionData || isConsumptionDataItemsEmpty) {
    return <GraphEmptyData />;
  }

  return (
    <Wrapper id="graphWrapper">
      <GraphGradient resource={resource} />

      <VictoryChart
        padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
        domain={{ y: dynamicMinMax }}
        style={{
          parent: {
            overflow: 'visible',
            height,
          },
        }}
        height={height}
        width={width}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
        animate={
          featureToggles.chartAnimation && {
            onLoad: { duration: 1000 },
            duration: 400,
            easing: 'bounce',
          }
        }
      >
        <VictoryAxis
          tickComponent={<TickComponent />}
          tickFormat={(day) => {
            if (day % 5) {
              return '';
            }
            return day;
          }}
          style={horizontalAxisStyle}
        />
        <VictoryAxis
          domain={dynamicMinMax}
          dependentAxis
          style={verticalAxisStyle}
        />
        {lines}
        {checked.currentMonthData.housing && (
          <VictoryArea
            data={consumptionData.currentMonthData?.housing}
            x="key"
            y="value"
            interpolation="monotoneX"
            style={getCurrentDataStyle(resource)}
            labels={() => ''}
            labelComponent={
              <CustomTooltip
                flyoutStyle={{ fill: 'var(--main-100)' }}
                style={{ fill: '#fff' }}
                height={height}
                flyoutComponent={
                  <ResourceConsumptionGraphTooltip
                    startOfMonth={startOfMonth}
                    measure={ResourceConsumptionGraphColorsMeasure[resource]}
                  />
                }
                minValue={dynamicMinMax[0]}
                maxValue={dynamicMinMax[1]}
              />
            }
          />
        )}
      </VictoryChart>
    </Wrapper>
  );
};
