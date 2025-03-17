import React, { FC } from 'react';
import { Wrapper } from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ECalculatorConnectionGroupType } from 'api/types';

export const Statistics: FC<Props> = ({
  calculatorsSortedList,
  isLoading,
  handlePing,
  handleDownload,
  isDownloading,
}) => {
  return (
    <WithLoader isLoading={isLoading}>
      {calculatorsSortedList && (
        <Wrapper>
          {Object.values(ECalculatorConnectionGroupType).map(
            (connectionStatus) => (
              <DevicesPanel
                panelTitle={connectionStatus}
                calculators={
                  calculatorsSortedList.find(
                    (elem) => elem.connectionGroupType === connectionStatus,
                  )?.calculatorConnectionStatisticsList || null
                }
                key={connectionStatus}
                handleDownload={handleDownload}
                isDownloading={isDownloading}
                handlePing={handlePing}
              />
            ),
          )}
        </Wrapper>
      )}
    </WithLoader>
  );
};
