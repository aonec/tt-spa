import { message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import {
  $addPersonalNumberRequestStatus,
  addPersonalNmberSaveButtonClicked,
  addPersonalNumberFx,
  setAddPersonalNumberStatus,
} from './models';
import { useHistory } from 'react-router';

export const AddPersonalNumberPage = () => {
  const pendingAdd = useStore(addPersonalNumberFx.pending);
  const status = useStore($addPersonalNumberRequestStatus);
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

    setAddPersonalNumberStatus(null);
  }, [status]);

  return (
    <PersonaNumberActionPage
      title="Добавление лицевого счета"
      loading={pendingAdd}
      onSaveHandler={addPersonalNmberSaveButtonClicked}
    >
      <PersonalNumberEditForm />
    </PersonaNumberActionPage>
  );
};
