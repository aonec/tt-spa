import React from 'react';
import { useParams } from 'react-router';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from './components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from './components/PersonalNumberEditForm';

export const EditHomeownerPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();

  return (
    <>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage title="Редактирование лицевого счета">
        <PersonalNumberEditForm />
      </PersonaNumberActionPage>
    </>
  );
};
