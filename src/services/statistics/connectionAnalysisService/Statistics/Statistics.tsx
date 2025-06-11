import React, { FC } from 'react';
import { Wrapper } from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { ECalculatorConnectionGroupType } from 'api/types';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const Statistics: FC<Props> = ({
  calculatorsSortedList,
  isLoading,
  handlePing,
  handleDownload,
  isDownloading,
  pageNumbers,
  setPageNumber,
}) => {
  const isRealLoader = isLoading && !calculatorsSortedList;

  return (
    <WithLoader isLoading={isRealLoader}>
      {calculatorsSortedList && (
        <Wrapper>
          {Object.values(ECalculatorConnectionGroupType).map(
            (connectionStatus) => (
              <DevicesPanel
                panelTitle={connectionStatus}
                calculators={
                  calculatorsSortedList?.find(
                    (elem) => elem.connectionGroupType === connectionStatus,
                  )?.calculatorConnectionStatisticsList || null
                }
                key={connectionStatus}
                handleDownload={handleDownload}
                isDownloading={isDownloading}
                handlePing={handlePing}
                pageNumbers={pageNumbers}
                setPageNumber={setPageNumber}
              />
            ),
          )}
        </Wrapper>
      )}
    </WithLoader>
  );
};
