import { useStore } from 'effector-react';
import React from 'react';
import { emailNotifyService } from './emailNotifyService.model';
import { EmailNotifySelect } from './view/EmailNotifySelect';

const { outputs, gates } = emailNotifyService;

const { ContractorsGate } = gates;

export const EmailNotifyContainer = () => {
  const contractors = useStore(outputs.$contractors);

  return (
    <>
      <ContractorsGate />
      <EmailNotifySelect contractors={contractors} />
    </>
  );
};
