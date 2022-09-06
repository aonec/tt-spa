import { useStore } from 'effector-react';
import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { emailNotifyService } from './emailNotifyService.model';
import { EmailNotifySelect } from './view/EmailNotifySelect';

const { outputs, gates } = emailNotifyService;

const { ContractorsGate } = gates;

export const EmailNotifyContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const contractors = useStore(outputs.$contractors);

  const handleContractorChange = useCallback((contractorIds: number[]) => {
    if (!contractorIds.length) return;

    handleChange((prev) => ({
      ...prev,
      emailNotify: {
        ...(prev.emailNotify || {}),
        contractorIds,
      },
    }));
  }, []);

  return (
    <>
      <ContractorsGate />
      <EmailNotifySelect
        handleContractorChange={handleContractorChange}
        contractors={contractors}
      />
    </>
  );
};
