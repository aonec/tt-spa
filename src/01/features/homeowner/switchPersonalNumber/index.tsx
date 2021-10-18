import React from 'react';
import { useParams } from 'react-router';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';

export const SwitchPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();

  return (
    <>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage title="Замена лицевого счета">
        <PersonalNumberEditForm type="switch" />
      </PersonaNumberActionPage>
    </>
  );
};
