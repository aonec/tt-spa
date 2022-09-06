import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { emailNotifyService } from './emailNotifyService.model';
import { EmailNotifySelect } from './view/EmailNotifySelect';

const { outputs, gates } = emailNotifyService;

const { ContractorsGate } = gates;

export const EmailNotifyContainer: FC<ActionComponentProps> = () => {
  const contractors = useStore(outputs.$contractors);

  return (
    <>
      <ContractorsGate />
      <EmailNotifySelect contractors={contractors} />
    </>
  );
};
