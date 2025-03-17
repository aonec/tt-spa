import React, { FC } from 'react';
import { Wrapper } from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { ECalculatorConnectionGroupType } from 'api/types';

export const Statistics: FC<Props> = ({
  calculatorsSortedList,
  handleDownload,
  isDownloading,
  pageNumber,
  setPageNumber,
}) => {
  return (
    calculatorsSortedList && (
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
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          ),
        )}
      </Wrapper>
    )
  );
};
