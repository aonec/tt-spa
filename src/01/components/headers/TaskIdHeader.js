/* eslint-disable */

import React from 'react';

import { Timeline } from '01/components/Timeline';
import { Timer } from '01/components/Timer';

export const TaksIdHeader = ({
  styles,
  name = null,
  currentStage = {},
  creationTime,
  expectedCompletionTime,
  closingTime,
}) => {
  // ----------loading-------------
  if (!name)
    return (
      <block>
        <h1>Загрузка...</h1>
      </block>
    );

  return (
    <block>
      <h1>{currentStage.name}</h1>
      <name>{name}</name>
      {timeline}
      {timer}
    </block>
  );
};

TaksIdHeader.defaultProps = {
  styles: css`
    block {
      grid-column: 1 / -1;
      display: grid;
      grid-template-rows: 48px 16px;
      grid-gap: 8px;
      align-items: center;
      padding: 8px;
    }
  `,
};
