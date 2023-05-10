import React, { FC } from 'react';
import { InputSC, Wrapper } from './SwitchStage.styled';
import { SwitchStageProps } from './SwitchStage.types';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export const SwitchStage: FC<SwitchStageProps> = ({
  homeowner,
  formId,
  handleSubmitSplitStage,
}) => {
  return (
    <>
      <Wrapper>
        <InputSC
          disabled
          value={homeowner?.personalAccountNumber || undefined}
        />
      </Wrapper>
      <PersonalNumberForm
        type={PersonalNumberActions.Split}
        formId={formId}
        handleSubmitSplitStage={handleSubmitSplitStage}
        homeowner={homeowner}
      />
    </>
  );
};
