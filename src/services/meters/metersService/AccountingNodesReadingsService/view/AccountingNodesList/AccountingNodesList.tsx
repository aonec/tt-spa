import React, { FC, useMemo } from 'react';
import { Wrapper } from './AccountingNodesList.styled';
import { AccountingNodesListProps } from './AccountingNodesList.types';
import { AccountingNodesListHeader } from './AccountingNodesListHeader';
import { MeteringDeviceReadingsSumPanel } from '../MeteringDeviceReadingsSumPanel';
import { AccountingNodesReadingsInputContainer } from 'services/meters/accountingNodesReadingsInputService';

export const AccountingNodesList: FC<AccountingNodesListProps> = ({
  electricNodes,
  downSliderIndex,
  sliderIndex,
  upSliderIndex,
  sum,
}) => {
  const list = useMemo(
    () =>
      electricNodes.map((device, index) => {
        const counter = device.counter;

        if (!counter) {
          return null;
        }

        return (
          <AccountingNodesReadingsInputContainer
            device={counter}
            sliderIndex={sliderIndex}
            deviceIndex={index}
            key={device.id}
          />
        );
      }),
    [electricNodes, sliderIndex],
  );

  return (
    <>
      <Wrapper>
        <AccountingNodesListHeader
          sliderIndex={sliderIndex}
          upSliderIndex={upSliderIndex}
          downSliderIndex={downSliderIndex}
        />
        {list}
      </Wrapper>
      <MeteringDeviceReadingsSumPanel sum={sum} />
    </>
  );
};
