import React, { FC, useEffect, useMemo, useState } from 'react';
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
import {
  ResourceConsumptionGraphColorsMeasure,
  tickValues,
} from './ResourceConsumptionGraph.constants';
import {
  AlertTitle,
  AlertWrapper,
  getCurrentDataStyle,
  Wrapper,
} from './ResourceConsumptionGraph.styled';
import { ResourceConsumptionGraphProps } from './ResourceConsumptionGraph.types';
import {
  getGraphTypeColors,
  hasNoConsecutiveNumbers,
} from './ResourceConsumptionGraph.utils';
import { ResourceConsumptionGraphTooltip } from './ResourceConsumptionGraphTooltip';
import { GraphGradient } from 'ui-kit/shared/GraphComponents/GraphGradient';
import {
  horizontalAxisStyle,
  verticalAxisStyle,
} from 'services/nodes/displayNodesStatisticsService/view/StatisticsGraph/StatisticsGraph.styled';
import { CustomTooltip } from 'ui-kit/shared/GraphComponents/CustomTooltip';
import { Alert } from 'ui-kit/Alert';

const height = 360;

export const ResourceConsumptionGraph: FC<ResourceConsumptionGraphProps> = ({
  consumptionData,
  resource,
  resourceForColor,
  startOfMonth,
  checked,
  selectedAddresses,
  dynamicMinMax,
  isAllDataLoading,
  isDataLoading,
  isOnlyHousingDataEmpty,
}) => {
  const [width, setWidth] = useState(0);

  const additionalAddressConsumptionData =
    consumptionData?.additionalAddress || null;

  const lines = useMemo(() => {
    return Object.values(ResourceConsumptionGraphDataType).map((typeOfData) => {
      const isAdditionalAddress =
        (additionalAddressConsumptionData &&
          typeOfData === ResourceConsumptionGraphDataType.prevMonthData) ||
        !selectedAddresses.additionalAddress;

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
                    resource: resourceForColor,
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
    checked,
    selectedAddresses,
    additionalAddressConsumptionData,
    resourceForColor,
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
        hasNoConsecutiveNumbers(
          consumptionData.currentMonthData?.housing || [],
        ),
        hasNoConsecutiveNumbers(
          consumptionData.currentMonthData?.normative || [],
        ),
        hasNoConsecutiveNumbers(
          consumptionData.currentMonthData?.subscriber || [],
        ),
        hasNoConsecutiveNumbers(consumptionData.prevMonthData?.housing || []),
        hasNoConsecutiveNumbers(consumptionData.prevMonthData?.normative || []),
        hasNoConsecutiveNumbers(
          consumptionData.prevMonthData?.subscriber || [],
        ),
      ].every(Boolean) && !isDataLoading,
    [consumptionData, isDataLoading],
  );

  if (isConsumptionDataItemsEmpty) {
    return (
      <>
        <Wrapper id="graphWrapper">
          <AlertWrapper>
            <Alert centered type="danger" icon="warning">
              <AlertTitle>Нет данных за выбранный период</AlertTitle>
            </Alert>
          </AlertWrapper>
          <VictoryChart
            padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
            domain={{ y: dynamicMinMax }}
            style={{
              parent: {
                overflow: 'visible',
                height: 300,
              },
            }}
            height={300}
            width={width}
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryAxis
              tickValues={tickValues}
              tickFormat={(day) => {
                if (day % 5) {
                  return '';
                }
                return day;
              }}
              style={horizontalAxisStyle}
            />
            <VictoryAxis dependentAxis style={verticalAxisStyle} />
          </VictoryChart>
        </Wrapper>
      </>
    );
  }

  return (
    <Wrapper id="graphWrapper" isLoading={isAllDataLoading}>
      {isOnlyHousingDataEmpty && (
        <AlertWrapper>
          <Alert centered type="default" icon="warning">
            <AlertTitle>Нет данных по общедомовому потреблению.</AlertTitle>
          </Alert>
        </AlertWrapper>
      )}

      <GraphGradient resource={resourceForColor} />
      <VictoryChart
        domain={{ y: dynamicMinMax, x: [-1, 32] }}
        padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
        domainPadding={{ x: [-50, 0] }}
        style={{
          parent: {
            overflow: 'visible',
            height: isOnlyHousingDataEmpty ? 300 : height,
          },
        }}
        height={isOnlyHousingDataEmpty ? 300 : height}
        width={width}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          tickFormat={(day) => {
            if (day === 0) {
              return day;
            }
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
        {checked.currentMonthData.housing && (
          <VictoryArea
            data={consumptionData.currentMonthData?.housing}
            x="key"
            y="value"
            interpolation="monotoneX"
            style={getCurrentDataStyle(resourceForColor)}
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
        {lines}
      </VictoryChart>
    </Wrapper>
  );
};
