import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from './components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from './components/PersonalNumberEditForm';
import {
  $editRequestStatus,
  editHomeownerAccountEffect,
  editHomeownerSaveButtonClicked,
  setEditRequestStatus,
} from './models';
import { message } from 'antd';

export const EditHomeownerPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const loading = useStore(editHomeownerAccountEffect.pending);
  const status = useStore($editRequestStatus);
  const history = useHistory();

  useEffect(() => {
    if (!status) return;

    if (status === 'done') {
      history.goBack();
      message.success('Лицевой счет успешно изменен');
    }

    if (status === 'failed') {
      message.error('Ошибка сохранения');
    }

    setEditRequestStatus(null);
  }, [status]);

  return (
    <>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage
        loading={loading}
        title="Редактирование лицевого счета"
        onSaveHandler={editHomeownerSaveButtonClicked}
      >
        <PersonalNumberEditForm />
      </PersonaNumberActionPage>
    </>
  );
};
