import { useUnit } from 'effector-react';
import React, { FC, ReactElement, useCallback } from 'react';
import {
  ActionComponentProps,
  TaskPanelComponentAdditionalType,
} from '../TaskActionsPanel.types';
import { emailNotifyService } from './emailNotifyService.model';
import { EmailNotifySelect } from './view/EmailNotifySelect';
import { EmailTextInput } from './view/EmailTextInput';

const { outputs } = emailNotifyService;

export const EmailNotifyContainer: FC<ActionComponentProps> = ({
  handleChange,
  task,
}) => {
  const type = task.type;
  const { contractors } = useUnit({ contractors: outputs.$contractors });

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
    [handleChange],
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
    [handleChange],
  );

  const components: {
    [key: string]: ReactElement;
  } = {
    [TaskPanelComponentAdditionalType.ContractorSelect]: (
      <EmailNotifySelect
        handleContractorChange={handleContractorChange}
        contractors={contractors}
      />
    ),
    [TaskPanelComponentAdditionalType.MailText]: (
      <EmailTextInput handleMessageChange={handleMessageChange} />
    ),
  };

  if (!type) return null;

  const component = components[type];

  if (!component) return null;

  return component;
};
