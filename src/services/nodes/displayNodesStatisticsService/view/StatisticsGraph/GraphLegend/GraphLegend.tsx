import React, { FC } from 'react';
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
import { renderForHeatAndDeltaMass } from './GraphLegend.utils';
import { EResourceType } from 'myApi';

export const GraphLegend: FC<GraphLegendProps> = ({
  graphParam,
  isTasksExist,
  resource,
  deltaMassAccuracy,
  averageDeltaMass,
}) => {
  const isDeltaMass = renderForHeatAndDeltaMass(
    resource as EResourceType,
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
          resource={resource as EResourceType}
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
