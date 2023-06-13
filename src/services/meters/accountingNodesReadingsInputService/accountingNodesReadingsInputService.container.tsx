import React, { FC } from 'react';
import { AccountingNodesReadingsInputContainerProps } from './accountingNodesReadingsInputService.types';
import { accountingNodesReadingsInputService } from './accountingNodesReadingsInputService.model';

const { gates, inputs, outputs } = accountingNodesReadingsInputService;
const { AccountingNodesReadingsInputGate } = gates;

export const AccountingNodesReadingsInputContainer: FC<
  AccountingNodesReadingsInputContainerProps
> = ({ sliderIndex, device }) => {
  return (
    <>
      <AccountingNodesReadingsInputGate nodeId={device.id} />
    </>
  );
};
