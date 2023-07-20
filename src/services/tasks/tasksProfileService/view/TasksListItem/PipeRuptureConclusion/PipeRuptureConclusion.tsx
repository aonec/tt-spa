import { ETaskConfirmationType } from 'api/myApi';
import React, { FC } from 'react';
import { PipeIcon } from 'ui-kit/icons';
import { Wrapper } from './PipeRuptureConclusion.styled';
import { PipeRuptureConclusionProps } from './PipeRuptureConclusion.types';

export const PipeRuptureConclusion: FC<PipeRuptureConclusionProps> = ({
  taskConfirmation,
}) => {
  if (!taskConfirmation) {
    return null;
  }

  const isConfirmed = taskConfirmation.type === ETaskConfirmationType.Confirm;

  return (
    <Wrapper isConfirmed={isConfirmed}>
      <PipeIcon />
      {taskConfirmation.description}
    </Wrapper>
  );
};
