import React, { FC } from 'react';
import { Wrapper } from './AccountingNodesList.styled';
import { AccountingNodesListProps } from './AccountingNodesList.types';
import { AccountingNodesListHeader } from './AccountingNodesListHeader';
import { MeteringDeviceReadingsSumPanel } from '../MeteringDeviceReadingsSumPanel';

export const AccountingNodesList: FC<AccountingNodesListProps> = ({
  electricNodes,
  downSliderIndex,
  sliderIndex,
  upSliderIndex,
}) => {
  const sum = 0;

  return (
    <>
      <Wrapper>
        <AccountingNodesListHeader
          sliderIndex={sliderIndex}
          upSliderIndex={upSliderIndex}
          downSliderIndex={downSliderIndex}
        />
      </Wrapper>
      <MeteringDeviceReadingsSumPanel sum={sum} />
    </>
  );
};
