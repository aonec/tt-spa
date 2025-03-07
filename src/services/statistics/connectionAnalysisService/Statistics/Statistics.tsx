import React, { FC } from 'react';
import { Wrapper } from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { ConnectionStatuses } from '../connectionAnalysisService.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const Statistics: FC<Props> = ({
  calculatorsSortedList,
  isLoading,
  handlePing,
}) => {
  return (
    <WithLoader isLoading={isLoading}>
      {calculatorsSortedList && (
        <Wrapper>
          {Object.values(ConnectionStatuses).map((connectionStatus) => (
            <DevicesPanel
              panelTitle={connectionStatus}
              calculators={calculatorsSortedList[connectionStatus]}
              key={connectionStatus}
              handlePing={handlePing}
            />
          ))}
        </Wrapper>
      )}
    </WithLoader>
  );
};
