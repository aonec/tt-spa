import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { $graphData } from '../../../../features/graph/graphView/models';
import { Tooltip } from 'antd';
import { renderForHeatAndDeltaMass } from '../../utils/renderForHeatAndDeltaMass';
import {
  Accuracy,
  LegendLine,
  LegendLineWrapper,
  LegendWrapper,
  Percents,
} from './GraphLegend.styled';
import { GraphLegendProps } from './GraphLegend.types';

export const GraphLegend: FC<GraphLegendProps> = ({ graphParam }) => {
  const { data } = useStore($graphData);
  const { averageDeltaMass, deltaMassAccuracy, resource } = data;
  const absoluteDelta = Number(
    Math.abs((averageDeltaMass * deltaMassAccuracy) / 100).toFixed(1)
  );

  const renderAccuracyLegendLine = () => {
    const isAccuracyRendered = renderForHeatAndDeltaMass(resource, graphParam);
    if (!isAccuracyRendered) {
      return null;
    }
    return <LegendLine color={'var(--main-100)'}>Среднее значение</LegendLine>;
  };

  const renderAccuracyValue = () => {
    const isAccuracyRendered = renderForHeatAndDeltaMass(resource, graphParam);

    if (!isAccuracyRendered) {
      return null;
    }

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
        <LegendLine resource={resource} style={{ marginBottom: 16 }}>
          Текущий период
        </LegendLine>
        {renderAccuracyLegendLine()}
      </LegendLineWrapper>
      {renderAccuracyValue()}
    </LegendWrapper>
  );
};
