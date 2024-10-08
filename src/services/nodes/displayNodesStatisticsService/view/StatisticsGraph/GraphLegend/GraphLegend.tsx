import React, { FC } from 'react';
import { Tooltip } from 'ui-kit/shared/Tooltip';
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
  CheckboxSC,
} from './GraphLegend.styled';
import { GraphLegendProps } from './GraphLegend.types';
import { renderForHeatAndDeltaMass } from './GraphLegend.utils';
import { EResourceType } from 'api/types';

export const GraphLegend: FC<GraphLegendProps> = ({
  graphParam,
  isTasksExist,
  resource,
  deltaMassAccuracy,
  averageDeltaMass,
  setWithFault,
  withFault,
}) => {
  const isDeltaMass = renderForHeatAndDeltaMass(
    resource as EResourceType,
    graphParam,
  );

  const isAverageLineRendered = renderForHeatAndDeltaMass(
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
    if (!isAverageLineRendered) {
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
      <LegendColumnWrapper>
        <CheckboxSC
          checked={withFault}
          onChange={(e) => setWithFault(e.target.checked)}
        >
          Нештатные ситуации
        </CheckboxSC>
      </LegendColumnWrapper>
    </LegendWrapper>
  );
};
