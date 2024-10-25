import React, { FC } from 'react';
import { Wrapper } from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { ConnectionStatuses } from '../connectionAnalysisService.types';

export const Statistics: FC<Props> = ({ calculatorsSortedList }) => {
  if (!calculatorsSortedList) {
    return null;
  }

  return (
    <Wrapper>
      {Object.values(ConnectionStatuses).map((connectionStatus) => (
        <DevicesPanel
          panelTitle={connectionStatus}
          calculators={calculatorsSortedList[connectionStatus]}
          key={connectionStatus}
        />
      ))}
    </Wrapper>
  );
};
