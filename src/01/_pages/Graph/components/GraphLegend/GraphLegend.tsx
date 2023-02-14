import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { $graphData } from '../../../../features/graph/graphView/models';
import { Tooltip } from 'antd';
import {
  Accuracy,
  LegendCircle,
  LegendCircleWithBorder,
  LegendLine,
  LegendLineWrapper,
  LegendWrapper,
  Percents,
  TaskLegendGroupWrapper,
  LegendColumnWrapper,
} from './GraphLegend.styled';
import { GraphLegendProps } from './GraphLegend.types';
import { ResourceType } from '../GraphView/GraphView.types';
import { renderForHeatAndDeltaMass } from './GraphLegend.utils';

export const GraphLegend: FC<GraphLegendProps> = ({
  graphParam,
  isTasksExist,
}) => {
  const graphData = useStore($graphData);
  if (!graphData || !graphData.resource) {
    return null;
  }
  const { resource, deltaMassAccuracy, averageDeltaMass } = graphData;
  const isDeltaMass = renderForHeatAndDeltaMass(
    resource as ResourceType,
    graphParam,
  );

  const isRenderAccuracy = !(
    !isDeltaMass ||
    deltaMassAccuracy === null ||
    deltaMassAccuracy === undefined ||
    averageDeltaMass === null ||
    averageDeltaMass === undefined
  );

  const renderAccuracyLegendLine = () => {
    if (!isRenderAccuracy) {
      return null;
    }
    return <LegendLine color={'var(--main-100)'}>Среднее значение</LegendLine>;
  };

  const renderAccuracyValue = () => {
    if (!isRenderAccuracy) {
      return null;
    }
    const absoluteDelta = Number(
      Math.abs((averageDeltaMass * deltaMassAccuracy) / 100).toFixed(1),
    );

    return (
      <Tooltip
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode as HTMLElement
        }
        color={'var(--main-100)'}
        title={
          absoluteDelta === 0
            ? 'Абсолютная погрешность крайне мала'
            : `Абсолютная погрешность ${absoluteDelta} т`
        }
      >
        <Percents>{Math.abs(deltaMassAccuracy).toFixed(1)}%</Percents>
        <Accuracy>Относительная погрешность</Accuracy>
      </Tooltip>
    );
  };

  return (
    <LegendWrapper>
      <LegendLineWrapper>
        <LegendLine
          resource={resource as ResourceType}
          style={{ marginBottom: 16 }}
        >
          Текущий период
        </LegendLine>
        {renderAccuracyLegendLine()}
      </LegendLineWrapper>
      <LegendColumnWrapper>
        {renderAccuracyValue()}

        {isTasksExist && (
          <>
            <TaskLegendGroupWrapper>
              <LegendCircle color={'#272F5A'} />
              Закрытая задача
            </TaskLegendGroupWrapper>

            <TaskLegendGroupWrapper>
              <LegendCircleWithBorder color={'#272F5A'} />
              Активная задача
            </TaskLegendGroupWrapper>

            <TaskLegendGroupWrapper>
              <LegendCircle color={'#FC525B'} />
              Аварийная задача
            </TaskLegendGroupWrapper>
          </>
        )}
      </LegendColumnWrapper>
    </LegendWrapper>
  );
};
