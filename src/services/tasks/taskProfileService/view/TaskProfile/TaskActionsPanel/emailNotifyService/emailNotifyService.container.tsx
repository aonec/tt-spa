import { useStore } from 'effector-react';
import React, { FC, ReactElement, useCallback } from 'react';
import {
  ActionComponentProps,
  TaskPanelActionComponentAdditionalType,
} from '../TaskActionsPanel.types';
import { emailNotifyService } from './emailNotifyService.model';
import { EmailNotifySelect } from './view/EmailNotifySelect';
import { EmailTextInput } from './view/EmailTextInput';

const { outputs } = emailNotifyService;

export const EmailNotifyContainer: FC<ActionComponentProps> = ({
  handleChange,
  type,
}) => {
  const contractors = useStore(outputs.$contractors);

  const handleContractorChange = useCallback(
    (contractorIds: number[]) => {
      handleChange((prev) => ({
        ...prev,
        emailNotify: {
          ...(prev.emailNotify || {}),
          contractorIds,
        },
      }));
    },
    [handleChange]
  );

  const handleMessageChange = useCallback(
    (text: string) => {
      handleChange((prev) => ({
        ...prev,
        emailNotify: {
          ...(prev.emailNotify || {}),
          message: text,
        },
      }));
    },
    [handleChange]
  );

  const components: {
    [key in TaskPanelActionComponentAdditionalType]: ReactElement;
  } = {
    'contractor-select': (
      <EmailNotifySelect
        handleContractorChange={handleContractorChange}
        contractors={contractors}
      />
    ),
    'mail-text': <EmailTextInput handleMessageChange={handleMessageChange} />,
  };

  return <>{type && components[type]}</>;
};
