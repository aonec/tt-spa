import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import { $homeowner, HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';

export const SwitchPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const homeowner = useStore($homeowner);

  return (
    <>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage title="Замена лицевого счета">
        <StyledSelect
          disabled
          value={homeowner?.personalAccountNumber!}
          style={{ width: '50%' }}
        />
        <SpaceLine />
        <PersonalNumberEditForm type="switch" />
      </PersonaNumberActionPage>
    </>
  );
};
