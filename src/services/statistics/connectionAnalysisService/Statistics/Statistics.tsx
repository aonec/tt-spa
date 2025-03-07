import React, { FC } from 'react';
import { Wrapper } from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { ConnectionStatuses } from '../connectionAnalysisService.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const Statistics: FC<Props> = ({ calculatorsSortedList, isLoading }) => {
  return (
    <WithLoader isLoading={isLoading}>
      {calculatorsSortedList && (
        <Wrapper>
          {Object.values(ConnectionStatuses).map((connectionStatus) => (
            <DevicesPanel
              panelTitle={connectionStatus}
              calculators={
                calculatorsSortedList.find(
                  (elem) => elem.connectionGroupType === connectionStatus,
                )?.calculatorConnectionStatisticsList || null
              }
              key={connectionStatus}
            />
          ))}
        </Wrapper>
      )}
    </WithLoader>
  );
};
