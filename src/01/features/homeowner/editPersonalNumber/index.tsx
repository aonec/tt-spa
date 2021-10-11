import React from 'react';
import { PersonaNumberActionPage } from './components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from './components/PersonalNumberEditForm';

export const EditHomeownerPersonalNumberPage = () => {
  return (
    <PersonaNumberActionPage title="Редактирование лицевого счета">
      <PersonalNumberEditForm />
    </PersonaNumberActionPage>
  );
};
