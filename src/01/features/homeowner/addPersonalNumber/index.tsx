import { message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useEvent, useStore } from 'effector-react';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import {
  $addPersonalNumberRequestStatus,
  $isConfirmationModalOpen,
  $samePersonalAccountNumderId,
  addPersonalNmberSaveButtonClicked,
  addPersonalNumberFx,
  handleConfirmationModalClose,
  onForced,
  setAddPersonalNumberStatus,
} from './models';
import { useHistory } from 'react-router';
import { ConfirmationAddingExistingPersonalNumber } from '../editPersonalNumber/components/ConfirmationAddingExistingPersonalNumberModal';

export const AddPersonalNumberPage = () => {
  const pendingAdd = useStore(addPersonalNumberFx.pending);
  const status = useStore($addPersonalNumberRequestStatus);
  const samePersonalAccountNumderId = useStore($samePersonalAccountNumderId);
  const isConfirmationModalOpen = useStore($isConfirmationModalOpen);

  const confirmationModalClose = useEvent(handleConfirmationModalClose);
  const handleForced = useEvent(onForced);

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
  }, [status, history]);

  return (
    <PersonaNumberActionPage
      title="Добавление лицевого счета"
      loading={pendingAdd}
      onSaveHandler={addPersonalNmberSaveButtonClicked}
    >
      <PersonalNumberEditForm />
      <ConfirmationAddingExistingPersonalNumber
        isConfirmationModalOpen={isConfirmationModalOpen}
        samePersonalAccountNumderId={samePersonalAccountNumderId}
        confirmationModalClose={() => confirmationModalClose()}
        handleForced={handleForced}
      />
    </PersonaNumberActionPage>
  );
};
