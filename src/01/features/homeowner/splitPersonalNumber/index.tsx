import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import React from 'react';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';

export const SplitPersonalNumber = () => {
  return (
    <>
      {/* <HomeownerGate id={homeownerId} /> */}
      <PersonaNumberActionPage
        // onSaveHandler={switchPersonalNumber}
        // loading={pendingSwitch}
        title="Замена лицевого счета"
      >
        <StyledSelect
          disabled
          //   value={homeowner?.personalAccountNumber!}
          style={{ width: '50%' }}
        />
        <SpaceLine />
        <PersonalNumberEditForm type="switch" />
      </PersonaNumberActionPage>
    </>
  );
};
