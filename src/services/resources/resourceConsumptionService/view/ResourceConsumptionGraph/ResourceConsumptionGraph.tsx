import React, { FC, useEffect, useMemo, useState } from 'react';
import { GraphEmptyData } from 'services/nodes/displayNodesStatisticsService/view/GraphEmptyData';
import { prepareData } from 'utils/Graph.utils';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import {
  MonthConsumptionData,
  ResourceConsumptionGraphDataType,
  ResourceConsumptionGraphType,
} from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraphColorsMeasure } from './ResourceConsumptionGraph.constants';
import {
  getCurrentDataStyle,
  Wrapper,
  ZeroLineStyle,
} from './ResourceConsumptionGraph.styled';
import { ResourceConsumptionGraphProps } from './ResourceConsumptionGraph.types';
import {
  getGraphTypeColors,
  getMinAndMaxForResourceConsumptionGraph,
} from './ResourceConsumptionGraph.utils';
import { ResourceConsumptionGraphTooltip } from './ResourceConsumptionGraphTooltip';
import { GraphGradient } from 'ui-kit/shared/GraphComponents/GraphGradient';
import { TickComponent } from 'ui-kit/shared/GraphComponents/TickComponent';
import {
  horizontalAxisStyle,
  verticalAxisStyle,
} from 'services/nodes/displayNodesStatisticsService/view/StatisticsGraph/StatisticsGraph.styled';
import { CustomTooltip } from 'ui-kit/shared/GraphComponents/CustomTooltip';

const height = 360;

export const ResourceConsumptionGraph: FC<ResourceConsumptionGraphProps> = ({
  consumptionData,
  resource,
  startOfMonth,
  checked,
  selectedAddresses,
  isAdditionalAddressSelected,
}) => {
  // console.log(selectedAddresses);

  const [width, setWidth] = useState(0);

  const [minmax, setMinmax] = useState<[number, number]>([0, 0]);

  const checkedCurrentMonthConsumption = useMemo(() => {
    const res = {
      [ResourceConsumptionGraphType.Housing]: checked.currentMonthData.housing
        ? consumptionData?.currentMonthData?.housing
        : [],
      [ResourceConsumptionGraphType.Normative]: checked.currentMonthData
        .normative
        ? consumptionData?.currentMonthData?.normative
        : [],
      [ResourceConsumptionGraphType.Subscriber]: checked.currentMonthData
        .subscriber
        ? consumptionData?.currentMonthData?.subscriber
        : [],
    };
    return res as MonthConsumptionData;
  }, [consumptionData?.currentMonthData, checked.currentMonthData]);

  const checkedPrevMonthConsumption = useMemo(() => {
    if (isAdditionalAddressSelected) return {};

    const res = {
      [ResourceConsumptionGraphType.Housing]: checked.prevMonthData.housing
        ? consumptionData?.prevMonthData?.housing
        : [],
      [ResourceConsumptionGraphType.Normative]: checked.prevMonthData.normative
        ? consumptionData?.prevMonthData?.normative
        : [],
      [ResourceConsumptionGraphType.Subscriber]: checked.prevMonthData
        .subscriber
        ? consumptionData?.prevMonthData?.subscriber
        : [],
    };
    return res as MonthConsumptionData;
  }, [
    consumptionData?.prevMonthData,
    checked.prevMonthData,
    isAdditionalAddressSelected,
  ]);

  const additionalAddressConsumptionData =
    consumptionData?.additionalAddress || null;

  const checkedAdditionalAddressConsumption = useMemo(() => {
    if (!isAdditionalAddressSelected || !selectedAddresses.additionalAddress)
      return {};

    const res = {
      [ResourceConsumptionGraphType.Housing]:
        additionalAddressConsumptionData?.housing,
      [ResourceConsumptionGraphType.Normative]:
        additionalAddressConsumptionData?.normative,
      [ResourceConsumptionGraphType.Subscriber]:
        additionalAddressConsumptionData?.subscriber,
    };
    return res as MonthConsumptionData;
  }, [
    selectedAddresses.additionalAddress,
    additionalAddressConsumptionData,
    isAdditionalAddressSelected,
  ]);

  const dataForMinMaxCalculation = [
    ...Object.values(checkedCurrentMonthConsumption),
    ...Object.values(checkedPrevMonthConsumption),
    ...Object.values(checkedAdditionalAddressConsumption),
  ].map(prepareData);

  const isHaveDataForMinMaxCalculation = Boolean(
    dataForMinMaxCalculation?.flat().length,
  );

  useEffect(() => {
    if (isHaveDataForMinMaxCalculation) {
      const { minValue, maxValue } = getMinAndMaxForResourceConsumptionGraph(
        dataForMinMaxCalculation,
      );

      setMinmax((prev) => {
        return prev[1] !== maxValue ? [minValue, maxValue] : prev;
      });
    }
  }, [dataForMinMaxCalculation, isHaveDataForMinMaxCalculation]);

  const lines = useMemo(
    () =>
      Object.values(ResourceConsumptionGraphDataType).map((typeOfData) => {
        const isAdditionalAddress =
          (additionalAddressConsumptionData &&
            typeOfData === ResourceConsumptionGraphDataType.prevMonthData) ||
          !selectedAddresses.additionalAddress;

        // console.log(isAdditionalAddress);

        const hideCurrentMonthData =
          typeOfData === ResourceConsumptionGraphDataType.currentMonthData &&
          !selectedAddresses.currentAddress;

        if (
          !consumptionData ||
          !resource ||
          isAdditionalAddress ||
          hideCurrentMonthData
        ) {
          return null;
        }

        const monthData = consumptionData[typeOfData];

        // console.log(monthData, typeOfData); // данные приходят

        const typeOfChecked =
          typeOfData === ResourceConsumptionGraphDataType.additionalAddress
            ? ResourceConsumptionGraphDataType.currentMonthData
            : typeOfData;

        // console.log(typeOfChecked);

        const isLineChecked = !isAdditionalAddress
          ? checked[typeOfChecked]
          : selectedAddresses.currentAddress
          ? checked[typeOfChecked]
          : checked[typeOfChecked];
        // console.log(monthChecked);

        if (!monthData) {
          // console.log('exit');
          return null;
        }

        return Object.entries(monthData).map(([key, data]) => {
          const isCurrentMonthHousingData =
            typeOfData === ResourceConsumptionGraphDataType.currentMonthData &&
            key === ResourceConsumptionGraphType.Housing;

          // console.log(monthChecked[key as ResourceConsumptionGraphType])

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
      }),
    [
      consumptionData,
      resource,
      checked,
      selectedAddresses,
      additionalAddressConsumptionData,
    ],
  );

  // console.log(lines);

  useEffect(() => {
    const wrapperNode = document.getElementById('graphWrapper');

    // if (!wrapperNode) {
    //   return;
    // }

    const handleResize = () => setWidth(wrapperNode?.clientWidth || 0);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (
    !consumptionData ||
    consumptionData?.currentMonthData?.housing?.length === 0 ||
    !resource
  ) {
    return <GraphEmptyData />;
  }

  return (
    <Wrapper id="graphWrapper">
      <GraphGradient resource={resource} />

      <VictoryChart
        padding={{ top: 0, bottom: 0, left: 26, right: 0 }}
        domain={{ y: minmax }}
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
        // animate={{
        //   duration: 200,
        //   onLoad: { duration: 600 },
        //   easing: 'linearInOut',
        // }}
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
        <VictoryAxis dependentAxis domain={minmax} style={verticalAxisStyle} />
        <VictoryLine
          samples={1}
          labels={['0', ``]}
          labelComponent={<VictoryLabel renderInPortal dy={7} dx={-16} />}
          y={() => 0}
          style={ZeroLineStyle}
        />
        {lines}
        {checked.currentMonthData.housing &&
          selectedAddresses.currentAddress && (
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
                  minValue={minmax[0]}
                  maxValue={minmax[1]}
                />
              }
            />
          )}
      </VictoryChart>
    </Wrapper>
  );
};
