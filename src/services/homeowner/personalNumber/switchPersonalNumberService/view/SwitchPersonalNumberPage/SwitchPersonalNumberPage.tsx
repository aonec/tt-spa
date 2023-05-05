import React, { FC } from 'react';
import { SwitchPersonalNumberPageProps } from './SwitchPersonalNumberPage.types';
import { PersonalNumberPageContainer } from 'services/homeowner/personalNumber/components/PersonalNumberPageContainer';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { InputSC, Wrapper } from './SwitchPersonalNumberPage.styled';

const formId = 'switch-personal-number-page';

export const SwitchPersonalNumberPage: FC<SwitchPersonalNumberPageProps> = ({
  apartment,
  handleForced,
  handleSwitchHomeownerAccount,
  homeowner,
  isLoading,
}) => {
  const ReplaceableAccountNumber = () => {
    return (
      <Wrapper>
        <InputSC
          disabled
          value={homeowner?.personalAccountNumber || undefined}
        />
      </Wrapper>
    );
  };

  return (
    <PersonalNumberPageContainer
      titleText="Замена лицевого счета"
      apartment={apartment}
      type={PersonalNumberActions.Edit}
      isLoading={isLoading}
      formId={formId}
    >
      <ReplaceableAccountNumber />
      <PersonalNumberForm
        type={PersonalNumberActions.Switch}
        formId={formId}
        handleSwitchHomeownerAccount={handleSwitchHomeownerAccount}
        homeowner={homeowner}
        handleForced={handleForced}
      />
    </PersonalNumberPageContainer>
  );
};
